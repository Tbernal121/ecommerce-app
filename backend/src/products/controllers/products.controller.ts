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
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dtos';
import { PositiveIntegerPipe } from '../../pipes/positive-integer.pipe';
import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe, PositiveIntegerPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Get('filter')
  getFilter(
    // In process
    @Query('price', ParseIntPipe) price: number = 100,
    @Query('id', ParseIntPipe) id: number = 20,
    @Query('brand') brand: string,
  ) {
    return {
      message: `products: price: ${price} id: ${id} brand: ${brand}`,
    };
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe, PositiveIntegerPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe, PositiveIntegerPipe) id: number) {
    return this.productsService.remove(id);
  }
}
