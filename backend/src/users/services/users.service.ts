import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';

import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { Order } from '../entities/order.entity';
import { ProductsService } from './../../products/services/products.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(private productsService: ProductsService) {}

  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'admin',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: ++this.counterId,
      ...payload,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);
    const index = this.users.findIndex((item) => item.id === id);
    this.users[index] = {
      ...user,
      ...payload,
      id: id, // To prevent the user from entering the ID in the body
    };
    return {
      Message: 'User updated',
      Updated: this.users[index],
    };
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id #${id} not found`);
    }
    this.users.splice(index, 1);
    return `product ${id} deleted`;
  }

  getOrderByUser(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
