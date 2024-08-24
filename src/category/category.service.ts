import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Category } from '../category/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ProductService } from '../product/product.service';
import { categorySeedData } from './data/category.data';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    @Inject(forwardRef(() => ProductService))
    private readonly productsService: ProductService,
  ) {}

  async findAll(relations: string[] = []): Promise<Category[]> {
    return await this.categoryRepo.find({ relations: relations });
  }

  async findOne(id: string, relations: string[] = []): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations,
    });
    if (!category) {
      throw new NotFoundException(`Category with id: ${id} not found`);
    }
    return category;
  }

  async findByIds(
    ids: string[],
    relations: string[] = [],
  ): Promise<Category[]> {
    const categories = await this.categoryRepo.find({
      where: {
        id: In(ids),
      },
      relations,
    });

    const foundIds = categories.map((category) => category.id);
    const missingIds = ids.filter((id) => !foundIds.includes(id));

    if (missingIds.length > 0) {
      throw new NotFoundException(
        `Categories with the following ids not found: ${missingIds.join(', ')}`,
      );
    }

    return categories;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepo.create(createCategoryDto);

    if (createCategoryDto.productsIds) {
      const products = await this.productsService.findByIds(
        createCategoryDto.productsIds,
      );
      newCategory.products = products;
    }

    return await this.categoryRepo.save(newCategory);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);

    if (updateCategoryDto.productsIds) {
      const products = await this.productsService.findByIds(
        updateCategoryDto.productsIds,
      );
      category.products = products;
    }

    this.categoryRepo.merge(category, updateCategoryDto);
    return await this.categoryRepo.save(category);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.categoryRepo.delete(id);
  }

  async seed() {
    for (const categoryData of categorySeedData) {
      const existingCategory = await this.categoryRepo.findOne({
        where: { name: categoryData.name },
      });
      if (!existingCategory) {
        const category = this.categoryRepo.create(categoryData);
        await this.categoryRepo.save(category);
      }
    }
  }
}
