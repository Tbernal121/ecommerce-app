import {
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
import { BrandsService } from './brands.service';
import { CategoriesService } from './categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @Inject(forwardRef(() => CategoriesService))
    private readonly categoryService: CategoriesService,

    private readonly brandService: BrandsService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepo.find({ relations: ['brand', 'categories'] });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return this.productRepo.find({
      where: {
        id: In(ids),
      },
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

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.delete(id);
  }
}
