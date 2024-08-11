import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id: #${id} not found`);
    }
    return category;
  }

  async findByIds(ids: string[]): Promise<Category[]> {
    return this.categoryRepo.find({
      where: {
        id: In(ids),
      },
    });
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepo.create(createCategoryDto);
    return await this.categoryRepo.save(newCategory);
  }

  async update(
    id: string,
    updateCategoryDtoayload: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne(id);
    this.categoryRepo.merge(category, updateCategoryDtoayload);
    return await this.categoryRepo.save(category);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.categoryRepo.delete(id);
  }
}
