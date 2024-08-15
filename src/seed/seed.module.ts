import { Module } from '@nestjs/common';

import { SeedService } from './seed.service';
import { BrandModule } from '../brand/brand.module';
import { CategoryModule } from '../category/category.module';
import { CustomerModule } from '../customer/customer.module';
import { OrderModule } from '../order/order.module';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
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
