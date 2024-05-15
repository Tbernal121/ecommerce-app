import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './controller/categories.controller';
import { ProductsController } from './controller/products.controller';

@Module({
  imports: [],
  controllers: [AppController, CategoriesController, ProductsController],
  providers: [AppService],
})
export class AppModule {}
