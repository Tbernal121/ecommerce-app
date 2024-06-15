import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { faker } from '@faker-js/faker';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dtos';

@Injectable()
export class CategoriesService {
  private counterId = 1;
  private categories: Category[] = [
    {
      // mini example DB, in a real app this should be with a real DB
      id: 1,
      name: faker.commerce.department(),
      description: faker.lorem.sentence(),
      image: faker.image.imageUrl(),
    },
  ];

  findAll() {
    return this.categories;
  }

  findOne(id: number) {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Category with id: #${id} not found`);
    }
    return category;
  }

  create(payload: CreateCategoryDto) {
    const newCategory = {
      id: ++this.counterId,
      ...payload,
    };
    this.categories.push(newCategory);
    return newCategory;
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id);
    const index = this.categories.findIndex((item) => item.id === id);
    this.categories[index] = {
      ...category,
      ...payload,
      id: id, // To prevent the user from entering the ID in the body
    };
    return {
      Message: 'Category updated',
      Updated: this.categories[index],
    };
  }

  remove(id: number) {
    const index = this.categories.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Category with id: #${id} not found`);
    }
    this.categories.splice(index, 1);
    return `Category ${id} deleted`;
  }
}
