import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SeedService } from './seed.service';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { CustomerModule } from '../customer/customer.module';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import config from '../common/config';
import { environments } from '../common/environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      // DB schemavalidation for seed (create one for the seed, other for the DB migrations and other general for the app)
    }),
    DatabaseModule,
    BrandModule,
    CategoryModule,
    CustomerModule,
    OrderModule,
    ProductModule,
    UserModule,
  ],
  providers: [SeedService],
})
export class SeedModule {}
