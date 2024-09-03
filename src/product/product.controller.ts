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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Product } from './product.entity';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/pagination-product.dto';
import { ValidateUUIDsArrayPipe } from '../common/pipes/uuids-array.pipe';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'List all product',
    description: 'Retrieve a list of all product',
  })
  async findAll(
    @Body('relations') relations?: string,
    @Query() params?: FilterProductDto,
  ): Promise<Product[]> {
    const parsedRelations = relations ? relations.split(',') : [];
    return this.productService.findAll(parsedRelations, params);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product by ID',
    description: 'Retrieve a single product by its ID',
  })
  async findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
  ): Promise<Product> {
    const parsedRelations = relations ? relations.split(',') : [];
    return this.productService.findOne(id, parsedRelations);
  }

  @Post()
  @ApiOperation({
    summary: 'Create product',
    description: 'Create a new product',
  })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update product',
    description: 'Update an existing product by its ID',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, updateProductDto);
  }

  @Put(':id/categories')
  @ApiOperation({
    summary: 'Add categories to a product',
    description: 'Add one or more categories to a product by its ID',
  })
  async addCategoriesByProduct(
    @Param('id') id: string,
    @Body('categoryIds', ValidateUUIDsArrayPipe) categoryIds: string[],
  ): Promise<Product> {
    const product = await this.productService.findOne(id, ['categories']);
    return this.productService.addCategoriesByProduct(product, categoryIds);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete product',
    description: 'Delete a product by its ID',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.productService.remove(id);
  }

  @Delete(':id/categories')
  @ApiOperation({
    summary: 'Remove categories from a product',
    description: 'Remove one or more categories from a product by its ID',
  })
  async removeCategoriesByProduct(
    @Param('id') id: string,
    @Body('categoryIds', ValidateUUIDsArrayPipe) categoryIds: string[],
  ): Promise<Product> {
    const product = await this.productService.findOne(id, ['categories']);
    return this.productService.removeCategoriesByProduct(product, categoryIds);
  }
}
