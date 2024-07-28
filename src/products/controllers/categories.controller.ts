import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CategoriesService } from '../services/categories.service';
import { PositiveIntegerPipe } from '../../common/pipes/positive-integer.pipe';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({
    summary: 'List all categories',
    description: 'Retrieve a list of all categories',
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get category by ID',
    description: 'Retrieve a single category by its ID',
  })
  get(@Param('id', ParseIntPipe, PositiveIntegerPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Get(':categoryId/products/:productId')
  @ApiOperation({
    summary: 'Get category and product details',
    description: 'Retrieve details of a product in a specific category',
  })
  getOneComplete(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return {
      message: `Product ${productId}, Category ${categoryId}`,
    };
  }

  @Post()
  @ApiOperation({
    summary: 'Create category',
    description: 'Create a new category',
  })
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update category',
    description: 'Update an existing category by its ID',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete category',
    description: 'Delete a category by its ID',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(+id);
  }
}
