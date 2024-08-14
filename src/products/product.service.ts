import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../category/category.service';

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
    return this.productRepo.find({
      where: {
        id: In(ids),
      },
      relations,
    });
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

  async addCategoryByProduct1(id: string, categoryId: string) {
    const product = await this.findOne(id, ['categories']);
    const category = await this.categoryService.findOne(categoryId);

    // check if the product already has the category
    if (!product.categories.find((item) => item.id == categoryId)) {
      product.categories.push(category);
    } else {
      throw new ConflictException(
        `Category with id ${categoryId} is already present in this product`,
      );
    }

    return this.productRepo.save(product);
  }

  async addCategoryByProduct(id: string, categoryId: string) {
    const product = await this.findOne(id, ['categories']);
    const category = await this.categoryService.findOne(categoryId);
    product.categories.push(category);
    return await this.productRepo.save(product);
  }

  async removeCategoryByProduct(id: string, categoryId: string) {
    const product = await this.findOne(id, ['categories']);
    product.categories = product.categories.filter(
      (category) => category.id !== categoryId,
    );
    return await this.productRepo.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.delete(id);
  }
}
