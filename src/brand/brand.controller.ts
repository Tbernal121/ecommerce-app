import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Brand } from './brand.entity';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiOperation({
    summary: 'List all brands',
    description: 'Retrieve a list of all brands',
  })
  findAll(@Query('relations') relations?: string): Promise<Brand[]> {
    const parsedRelations = relations ? relations.split(',') : [];
    return this.brandService.findAll(parsedRelations);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get brand by ID',
    description: 'Retrieve a single brand by its ID',
  })
  findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
  ): Promise<Brand> {
    const parsedRelations = relations ? relations.split(',') : [];
    return this.brandService.findOne(id, parsedRelations);
  }

  @Post()
  @ApiOperation({ summary: 'Create brand', description: 'Create a new brand' })
  create(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandService.create(createBrandDto);
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
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete brand',
    description: 'Delete a brand by its ID',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.brandService.remove(id);
  }
}
