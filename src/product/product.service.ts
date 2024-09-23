import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  In,
  Repository,
  FindOptionsWhere,
  Between,
  FindOptionsOrder,
  DataSource,
  QueryRunner,
} from 'typeorm';

import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/pagination-product.dto';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../category/category.service';
import { productSeedData } from './data/product.data';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @Inject(forwardRef(() => CategoryService))
    private readonly categoryService: CategoryService,

    private readonly brandService: BrandService,

    private readonly dataSource: DataSource,
  ) {}

  async findAll(
    relations: string[] = [],
    filterProductDto?: FilterProductDto,
  ): Promise<Product[]> {
    if (filterProductDto) {
      const where: FindOptionsWhere<Product> = {};
      const offset = (filterProductDto.page - 1) * filterProductDto.limit;

      if (filterProductDto.minPrice && filterProductDto.maxPrice) {
        where.price = Between(
          filterProductDto.minPrice,
          filterProductDto.maxPrice,
        );
      }

      if (filterProductDto.brandId) {
        where.brand = { id: filterProductDto.brandId };
      }

      const order: FindOptionsOrder<Product> = {};
      if (filterProductDto.orderBy && filterProductDto.order) {
        order[filterProductDto.orderBy] = filterProductDto.order;
      }

      return await this.productRepo.find({
        relations,
        where,
        order,
        skip: offset,
        take: filterProductDto.limit,
      });
    }
    return await this.productRepo.find({ relations: relations });
  }

  async findOne(id: string, relations: string[] = []): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations,
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async findByIds(ids: string[], relations: string[] = []): Promise<Product[]> {
    const products = await this.productRepo.find({
      where: {
        id: In(ids),
      },
      relations,
    });

    const foundIds = products.map((product) => product.id);
    const missingIds = ids.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
      throw new NotFoundException(
        `Products with the following ids not found: ${missingIds.join(', ')}`,
      );
    }

    return products;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepo.create(createProductDto);

    if (createProductDto.brandId) {
      const brand = await this.brandService.findOne(createProductDto.brandId);
      newProduct.brand = brand;
    }

    if (createProductDto.categoriesIds) {
      const categories = await this.categoryService.findByIds(
        createProductDto.categoriesIds,
      );
      newProduct.categories = categories;
    }

    return await this.productRepo.save(newProduct);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [product, brand] = await Promise.all([
        this.findOne(id, ['brand', 'categories']),
        updateProductDto.brandId
          ? this.brandService.findOne(updateProductDto.brandId)
          : null,
      ]);

      await this.handleCategoryUpdates(queryRunner, product, updateProductDto);

      if (updateProductDto.hasOwnProperty('brandId')) {
        if (updateProductDto.brandId === null) {
          product.brand = null;
        } else if (brand) {
          product.brand = brand;
        }
      }

      this.productRepo.merge(product, updateProductDto);
      await queryRunner.manager.save(product);
      await queryRunner.commitTransaction();

      return product;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      Logger.error(`Failed to update product: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        `Failed to update product: ${error.message}`,
      );
    } finally {
      await queryRunner.release();
    }
  }

  private async handleCategoryUpdates(
    queryRunner: QueryRunner,
    product: Product,
    updateProductDto: UpdateProductDto,
  ) {
    if (updateProductDto.categoriesIdsToAdd) {
      await this._addCategoriesByProduct(
        queryRunner,
        product,
        updateProductDto.categoriesIdsToAdd,
      );
    }

    if (updateProductDto.categoriesIdsToDelete) {
      await this._removeCategoriesByProduct(
        queryRunner,
        product,
        updateProductDto.categoriesIdsToDelete,
      );
    }
  }

  private async _addCategoriesByProduct(
    queryRunner: QueryRunner,
    product: Product,
    categoryIds: string[],
  ) {
    if (categoryIds.length === 0) {
      throw new BadRequestException('Category IDs must be provided');
    }

    const categories = await this.categoryService.findByIds(categoryIds);
    const existingCategoryIds = new Set(
      product.categories.map((category) => category.id),
    );
    const newCategories = categories.filter(
      (category) => !existingCategoryIds.has(category.id),
    );

    if (newCategories.length === 0) {
      throw new ConflictException(
        `All provided categories are already associated with this product`,
      );
    }

    product.categories.push(...newCategories);
    await queryRunner.manager.save(product);
  }

  async addCategoriesByProduct(product: Product, categoryIds: string[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this._addCategoriesByProduct(queryRunner, product, categoryIds);
      await queryRunner.commitTransaction();
      return product;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(
        `Failed to add categories to product: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Failed to add categories to product',
      );
    } finally {
      await queryRunner.release();
    }
  }

  async removeCategoriesByProduct(
    product: Product,
    categoryIds: string[],
  ): Promise<Product> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this._removeCategoriesByProduct(queryRunner, product, categoryIds);
      await queryRunner.commitTransaction();
      return product;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(
        `Failed to remove categories from product: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Failed to remove categories from product',
      );
    } finally {
      try {
        await queryRunner.release();
      } catch (releaseError) {
        console.error(
          `Failed to release query runner after removing categories: ${releaseError.message}`,
          releaseError.stack,
        );
      }
    }
  }

  private async _removeCategoriesByProduct(
    queryRunner: QueryRunner,
    product: Product,
    categoryIds: string[],
  ) {
    if (categoryIds.length === 0) {
      throw new BadRequestException('Category IDs must be provided');
    }

    const existingCategoryIds = new Set(
      product.categories.map((category) => category.id),
    );
    const categoriesToRemove = categoryIds.filter((id) =>
      existingCategoryIds.has(id),
    );

    if (categoriesToRemove.length === 0) {
      throw new ConflictException(
        `None of the provided categories are associated with this product.`,
      );
    }

    product.categories = product.categories.filter(
      (category) => !categoriesToRemove.includes(category.id),
    );

    await queryRunner.manager.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.delete(id);
  }

  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();
    const logger = new Logger('Product Seed');

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const productData of productSeedData) {
        const existingProduct = await queryRunner.manager.findOne(Product, {
          where: { id: productData.id },
        });
        if (!existingProduct) {
          const product = queryRunner.manager.create(Product, productData);
          await queryRunner.manager.save(product);
        }
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      logger.error(`Failed to seed products: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to seed products');
    } finally {
      await queryRunner.release();
    }
  }
}
