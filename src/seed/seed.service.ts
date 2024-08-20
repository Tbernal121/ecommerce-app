import { Injectable } from '@nestjs/common';

import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../category/category.service';
import { CustomerService } from '../customer/customer.service';
import { OrderService } from '../order/order.service';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly brandService: BrandService,
    private readonly CategoryService: CategoryService,
    private readonly customersService: CustomerService,
    private readonly ordersService: OrderService,
    private readonly productsService: ProductService,
    private readonly usersService: UserService,
  ) {}

  async runSeed() {
    await this.brandService.seed();
    await this.CategoryService.seed();
    await this.customersService.seed();
    // this.ordersService.seed();
    await this.productsService.seed();
    // this.usersService.seed();
  }
}
