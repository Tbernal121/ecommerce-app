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
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { PositiveIntegerPipe } from '../../common/pipes/positive-integer.pipe';
import { ProductsService } from '../services/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'List all products',
    description: 'Retrieve a list of all products',
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product by ID',
    description: 'Retrieve a single product by its ID',
  })
  get(@Param('id', ParseIntPipe, PositiveIntegerPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Get('filter')
  @ApiOperation({
    summary: 'Filter products',
    description: 'Filter products based on query parameters',
  })
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
  @ApiOperation({
    summary: 'Create product',
    description: 'Create a new product',
  })
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update product',
    description: 'Update an existing product by its ID',
  })
  update(
    @Param('id', ParseIntPipe, PositiveIntegerPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete product',
    description: 'Delete a product by its ID',
  })
  remove(@Param('id', ParseIntPipe, PositiveIntegerPipe) id: number) {
    return this.productsService.remove(id);
  }
}
