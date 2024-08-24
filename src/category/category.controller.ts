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
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: 'List all categories',
    description: 'Retrieve a list of all categories',
  })
  findAll(@Query('relations') relations?: string): Promise<Category[]> {
    const parsedRelations = relations ? relations.split(',') : [];
    return this.categoryService.findAll(parsedRelations);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get category by ID',
    description: 'Retrieve a single category by its ID',
  })
  findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
  ): Promise<Category> {
    const parsedRelations = relations ? relations.split(',') : [];
    return this.categoryService.findOne(id, parsedRelations);
  }

  @Post()
  @ApiOperation({
    summary: 'Create category',
    description: 'Create a new category',
  })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
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
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete category',
    description: 'Delete a category by its ID',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.categoryService.remove(id);
  }
}
