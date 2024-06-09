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

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe, PositiveIntegerPipe) id: number) {
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
  create(@Body() payload: any) {
    return {
      message: 'category created',
      payload,
    };
  }
}
