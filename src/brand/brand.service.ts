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
  private readonly logger = new Logger(BrandService.name);

  constructor(
    @InjectRepository(Brand) private readonly brandRepo: Repository<Brand>,

    private readonly dataSource: DataSource,
  ) {}

  async findAll(relations: string[] = []): Promise<Brand[]> {
    try {
      return await this.brandRepo.find({ relations });
    } catch (error) {
      this.logger.error(
        `Failed to retrieve brands: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to retrieve brands');
    }
  }

  async findOne(id: string, relations: string[] = []): Promise<Brand> {
    try {
      const brand = await this.brandRepo.findOne({ where: { id }, relations });
      if (!brand) {
        throw new NotFoundException(`Brand with id: ${id} not found`);
      }
      return brand;
    } catch (error) {
      this.logger.error(
        `Failed to retrieve brand with id ${id}: ${error.message}`,
        error.stack,
      );
      if (error instanceof NotFoundException) {
        throw error; // Re-throw specific NotFoundException
      }
      throw new InternalServerErrorException('Failed to retrieve the brand');
    }
  }

  async create(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      const newBrand = this.brandRepo.create(createBrandDto);
      return await this.brandRepo.save(newBrand);
    } catch (error) {
      this.logger.error(
        `Failed to create brand: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to create brand');
    }
  }

  async update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    try {
      const brand = await this.findOne(id);
      this.brandRepo.merge(brand, updateBrandDto);
      return await this.brandRepo.save(brand);
    } catch (error) {
      this.logger.error(
        `Failed to update brand with id ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to update brand');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const brand = await this.findOne(id);
      await this.brandRepo.remove(brand);
    } catch (error) {
      this.logger.error(
        `Failed to remove brand with id ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to remove brand');
    }
  }

  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();

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
      this.logger.error(`Failed to seed brands: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to seed brands');
    } finally {
      await queryRunner.release();
    }
  }
}
