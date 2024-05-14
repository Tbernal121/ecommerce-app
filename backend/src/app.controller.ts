import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('products/:productId')
  getProduct(@Param('productId') productId: string){ // @Param() { productId }
    return `product ${productId}`;
  }

  @Get('products')
  getProducts(@Query('limit') limit = 100, @Query('offset') offset = 20, @Query('brand') brand: string){ //  @Query() { limit, offset }
    return `products: limit: ${limit} offset: ${offset} brand ${brand}`
  }

  @Get('categories/:categoryId')
  getCategory(@Param() {categoryId}){ // @Param('categoryId') categoryId: string
    return `product ${categoryId}`;
  }

  @Get('categories/:categoryId/products/:productId')
  getCompleteProduct(@Param('productId') productId: string, @Param('categoryId') categoryId: string){ // @Param() { categoryId, productId }
    return `Product ${productId}, Category ${categoryId}`;
  }

  @Get('categories/:categoryId/products/:productId')
  agetCompleteProduct(@Param() { categoryId, productId }){
    return `Product ${productId}, Category ${categoryId}`;
  }
  
}