import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import { Brand } from './brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { brandSeedData } from './data/brand.data';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,

    private readonly dataSource: DataSource,
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

  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();
    const logger = new Logger('Brand Seed');

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const brandData of brandSeedData) {
        const existingBrand = await queryRunner.manager.findOne(Brand, {
          where: { id: brandData.id },
        });
        if (!existingBrand) {
          const brand = queryRunner.manager.create(Brand, brandData);
          await queryRunner.manager.save(brand);
        }
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      logger.error(`Failed to seed brands: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to seed brands');
    } finally {
      await queryRunner.release();
    }
  }
}
