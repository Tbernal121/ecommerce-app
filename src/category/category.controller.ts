import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiRelationsQuery } from '../common/decorators/api-relations-query.decorator';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: 'List all categories',
    description: 'Retrieve a list of all categories',
  })
  @ApiRelationsQuery()
  @ApiResponse({ status: 200, type: [Category] })
  async findAll(@Query('relations') relations?: string): Promise<Category[]> {
    const parsedRelations = relations ? relations.split(',') : [];
    return await this.categoryService.findAll(parsedRelations);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get category by ID',
    description: 'Retrieve a single category by its ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the category to retrieve',
    example: '59d2d97e-1a65-4cba-b5e3-9f3eb18c54dd',
  })
  @ApiRelationsQuery()
  @ApiResponse({ status: 200, type: Category })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Query('relations') relations?: string,
  ): Promise<Category> {
    const parsedRelations = relations ? relations.split(',') : [];
    return await this.categoryService.findOne(id, parsedRelations);
  }

  @Post()
  @ApiOperation({
    summary: 'Create category',
    description: 'Create a new category',
  })
  @ApiResponse({ status: 201, type: Category })
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update category',
    description: 'Update an existing category by its ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the category to update',
    example: '59d2d97e-1a65-4cba-b5e3-9f3eb18c54dd',
  })
  @ApiResponse({ status: 200, type: Category })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete category',
    description: 'Delete a category by its ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the category to delete',
    example: '59d2d97e-1a65-4cba-b5e3-9f3eb18c54dd',
  })
  @ApiResponse({ status: 200 })
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return await this.categoryService.remove(id);
  }
}
