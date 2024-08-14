import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { BrandService } from '../../brand/brand.service';
import { CategoriesService } from './categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @Inject(forwardRef(() => CategoriesService))
    private readonly categoryService: CategoriesService,

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

    this.productRepo.merge(product, updateProductDto);
    return await this.productRepo.save(product);
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
