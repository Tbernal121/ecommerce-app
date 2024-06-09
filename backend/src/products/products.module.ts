import { Module } from '@nestjs/common';
import { CategoriesController } from './controllers/categories.controller'
import { ProductsController } from './controllers/products.controller'
import { CategoriesService } from './services/categories.service'
import { ProductsService } from './services/products.service'



@Module({
    controllers: [CategoriesController, ProductsController],
    providers: [CategoriesService, ProductsService],
})
export class ProductsModule {}
