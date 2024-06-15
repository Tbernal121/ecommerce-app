import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  private counterId = 1;
  private brands: Brand[] = [
    {
      id: 1,
      name: faker.company.name(),
      image: faker.image.imageUrl(),
      website: faker.internet.url(),
      description: faker.company.catchPhrase(),
      rating: faker.datatype.float({ min: 1, max: 5, precision: 0.1 }),
      products: [],
    },
  ];

  findAll(): Brand[] {
    return this.brands;
  }

  findOne(id: number): Brand {
    const brand = this.brands.find((item) => item.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand with id: #${id} not found`);
    }
    return brand;
  }

  create(data: CreateBrandDto) {
    this.counterId = this.counterId + 1;
    const newBrand = {
      id: this.counterId,
      ...data,
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);
    if (!brand) {
      throw new NotFoundException(`Brand with id ${id} not found`);
    }
    const index = this.brands.findIndex((item) => item.id === id);
    this.brands[index] = {
      ...brand,
      ...payload,
    };
    return this.brands[index];
  }

  remove(id: number): boolean {
    const index = this.brands.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Brand with id: #${id} not found`);
    }
    this.brands.splice(index, 1);
    return true;
  }
}
