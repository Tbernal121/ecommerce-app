import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { DatabaseModule } from './database/database.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './products/product.module';
import { UsersModule } from './users/users.module';
import config from './common/config';
import validationSchema from './common/validation-schema';
import { environments } from './common/environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    ProductModule,
    UsersModule,
    DatabaseModule,
    OrderModule,
    BrandModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
