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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Brand } from './brand.entity';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiRelationsQuery } from '../common/decorators/api-relations-query.decorator';

@ApiTags('Brand')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Get()
  @ApiOperation({
    summary: 'List all brands',
    description: 'Retrieve a list of all brands',
  })
  @ApiRelationsQuery()
  @ApiResponse({ status: 200, type: [Brand] })
  async findAll(@Query('relations') relations?: string): Promise<Brand[]> {
    const parsedRelations = relations ? relations.split(',') : [];
    return await this.brandService.findAll(parsedRelations);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get brand by ID',
    description: 'Retrieve a single brand by its ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the brand to retrieve',
    example: '43e77a4d-6b4a-4456-8a13-d5f7b4e7c1c5',
  })
  @ApiRelationsQuery()
  @ApiResponse({ status: 200, type: Brand })
  async findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
  ): Promise<Brand> {
    const parsedRelations = relations ? relations.split(',') : [];
    return await this.brandService.findOne(id, parsedRelations);
  }

  @Post()
  @ApiOperation({ summary: 'Create brand', description: 'Create a new brand' })
  @ApiResponse({ status: 201, type: Brand })
  async create(@Body() createBrandDto: CreateBrandDto): Promise<Brand> {
    return await this.brandService.create(createBrandDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update brand',
    description: 'Update an existing brand by its ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the brand to update',
    example: '43e77a4d-6b4a-4456-8a13-d5f7b4e7c1c5',
  })
  @ApiResponse({ status: 200, type: Brand })
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ): Promise<Brand> {
    return await this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete brand',
    description: 'Delete a brand by its ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the brand to delete',
    example: '43e77a4d-6b4a-4456-8a13-d5f7b4e7c1c5',
  })
  @ApiResponse({ status: 200 })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.brandService.remove(id);
  }
}
