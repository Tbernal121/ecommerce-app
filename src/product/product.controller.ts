import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Product } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'List all product',
    description: 'Retrieve a list of all product',
  })
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product by ID',
    description: 'Retrieve a single product by its ID',
  })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create product',
    description: 'Create a new product',
  })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update product',
    description: 'Update an existing product by its ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Put(':id/category/:categoryId')
  @ApiOperation({
    summary: 'Add category to product',
    description: 'Add a category to a product by its ID',
  })
  addCategoryByProduct(
    @Param('id') id: string,
    @Param('categoryId') categoryId: string,
  ): Promise<Product> {
    return this.productService.addCategoryByProduct(id, categoryId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete product',
    description: 'Delete a product by its ID',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }

  @Delete(':id/category/:categoryId')
  @ApiOperation({
    summary: 'Remove category from product',
    description: 'Remove a category from a product by its ID',
  })
  removeCategoryByProduct(
    @Param('id') id: string,
    @Param('categoryId') categoryId: string,
  ): Promise<Product> {
    return this.productService.removeCategoryByProduct(id, categoryId);
  }
}
