import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './controller/categories.controller';
import { ProductsController } from './controller/products.controller';
import { ProductsService } from './services/products.service';

@Module({
  imports: [],
  controllers: [AppController, CategoriesController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
