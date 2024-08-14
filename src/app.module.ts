import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import config from './common/config';
import validationSchema from './common/validation-schema';
import { DatabaseModule } from './database/database.module';
import { environments } from './common/environments';
import { OrderModule } from './order/order.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema,
    }),
    ProductsModule,
    UsersModule,
    DatabaseModule,
    OrderModule,
    BrandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
