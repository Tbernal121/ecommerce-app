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
import { In, Repository } from 'typeorm';

import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
  ) {}

  async findAll(relations: string[] = []): Promise<Product[]> {
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
    const product = await this.findOne(id);

    if (updateProductDto.brandId) {
      const brand = await this.brandService.findOne(updateProductDto.brandId);
      product.brand = brand;
    }

    if (updateProductDto.categoriesIds) {
      const categories = await this.categoryService.findByIds(
        updateProductDto.categoriesIds,
      );
      product.categories = categories;
    }

    /*
    if (updateProductDto.categoriesIdsToDelete) {
      product.categories = await this.removeCategoryByProduct(
        product,
        updateProductDto.categoriesIdsToDelete,
      );
    }
    if (updateProductDto.categoriesIds) {
      product.categories = await this.addCategoryByProduct(
        product,
        updateProductDto.categoriesIds,
      );
    }*/

    this.productRepo.merge(product, updateProductDto);
    return await this.productRepo.save(product);
  }

  async addCategoriesByProduct(id: string, categoryIds: string[]) {
    try {
      if (!id || !categoryIds || categoryIds.length === 0) {
        throw new BadRequestException(
          'Product ID and Category IDs must be provided',
        );
      }

      const [product, categories] = await Promise.all([
        this.findOne(id, ['categories']),
        this.categoryService.findByIds(categoryIds),
      ]);
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
      return await this.productRepo.save(product);
    } catch (error) {
      Logger.error(
        `Failed to add categories to product: ${error.message}`,
        error.stack,
      );

      throw new InternalServerErrorException(
        `Failed to add categories to product: ${error.message}`,
      );
    }
  }

  async removeCategoriesByProduct(id: string, categoryIds: string[]) {
    try {
      if (!id || !categoryIds || categoryIds.length === 0) {
        throw new BadRequestException(
          'Product ID and Category IDs must be provided',
        );
      }

      const product = await this.findOne(id, ['categories']);
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
      return await this.productRepo.save(product);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to remove categories from a product: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.delete(id);
  }

  async seed() {
    for (const productData of productSeedData) {
      const existingProduct = await this.productRepo.findOne({
        where: { name: productData.name },
      });
      if (!existingProduct) {
        const product = this.productRepo.create(productData);
        await this.productRepo.save(product);
      }
    }
  }
}
