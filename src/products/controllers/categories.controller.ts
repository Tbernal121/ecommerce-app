import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { Category } from '../entities/category.entity';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({
    summary: 'List all categories',
    description: 'Retrieve a list of all categories',
  })
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get category by ID',
    description: 'Retrieve a single category by its ID',
  })
  findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create category',
    description: 'Create a new category',
  })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update category',
    description: 'Update an existing category by its ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete category',
    description: 'Delete a category by its ID',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriesService.remove(id);
  }
}
