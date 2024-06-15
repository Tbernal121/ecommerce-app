import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ControllersController } from './src/products/controllers.controller';
import { HolasModule } from './holas/holas.module';

@Module({
  imports: [ProductsModule, UsersModule, HolasModule],
  controllers: [AppController, ControllersController],
  providers: [AppService],
})
export class AppModule {}
