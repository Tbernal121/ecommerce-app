import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { BrandsController } from './controllers/brands.controller';
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { BrandsService } from './services/brands.service';

@Module({
  controllers: [CategoriesController, ProductsController, BrandsController],
  providers: [CategoriesService, ProductsService, BrandsService],
  exports: [ProductsService],
})
export class ProductsModule {}
