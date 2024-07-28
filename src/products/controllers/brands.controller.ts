import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Brand } from '../entities/brand.entity';
import { BrandsService } from '../services/brands.service';
import { CreateBrandDto, UpdateBrandDto } from '../dto/brand.dto';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  @ApiOperation({
    summary: 'List all brands',
    description: 'Retrieve a list of all brands',
  })
  findAll(): Promise<Brand[]> {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get brand by ID',
    description: 'Retrieve a single brand by its ID',
  })
  findOne(@Param('id') id: string): Promise<Brand> {
    return this.brandsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create brand', description: 'Create a new brand' })
  create(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandsService.create(createBrandDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update brand',
    description: 'Update an existing brand by its ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<Brand> {
    return this.brandsService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete brand',
    description: 'Delete a brand by its ID',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.brandsService.remove(id);
  }
}
