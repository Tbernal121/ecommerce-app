import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,
  ) {}

  async findAll(relations: string[] = []): Promise<Brand[]> {
    return await this.brandRepo.find({ relations: relations });
  }

  async findOne(id: string, relations: string[] = []): Promise<Brand> {
    const brand = await this.brandRepo.findOne({
      where: { id },
      relations,
    });
    if (!brand) {
      throw new NotFoundException(`Brand with id: ${id} not found`);
    }
    return brand;
  }

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const newBrand = this.brandRepo.create(createBrandDto);
    return await this.brandRepo.save(newBrand);
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    const brand = await this.findOne(id);
    this.brandRepo.merge(brand, updateBrandDto);
    return await this.brandRepo.save(brand);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.brandRepo.delete(id);
  }
}
