import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { PositiveIntegerPipe } from './../../pipes/positive-integer.pipe';
import { CreateCategoryDto, UpdateCategoryDto } from './../dtos/category.dtos';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe, PositiveIntegerPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Get(':categoryId/products/:productId')
  getOneComplete(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return {
      message: `Product ${productId}, Category ${categoryId}`,
    };
  }

  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(+id);
  }
}
