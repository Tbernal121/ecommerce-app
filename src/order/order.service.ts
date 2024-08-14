import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepo: Repository<OrderProduct>,
  ) {}

  async findAll(relations: string[] = []): Promise<Order[]> {
    return await this.orderRepo.find({ relations: relations });
  }

  async findOne(id: string, relations: string[] = []): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations,
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async create(createBrandDto: CreateOrderDto): Promise<Order> {
    const newBrand = this.orderRepo.create(createBrandDto);
    return await this.orderRepo.save(newBrand);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    this.orderRepo.merge(order, updateOrderDto);
    return await this.orderRepo.save(order);
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepo.delete(id);
  }
}
