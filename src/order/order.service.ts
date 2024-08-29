import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepo: Repository<OrderProduct>,

    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
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

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.processOrder(createOrderDto);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    this.orderRepo.merge(order, updateOrderDto);

    return await this.processOrder(updateOrderDto, order);
  }

  private async processOrder(
    orderDto: CreateOrderDto | UpdateOrderDto,
    existingOrder?: Order,
  ): Promise<Order> {
    try {
      if (!orderDto.products?.length) {
        throw new BadRequestException(
          'Order must contain at least one product',
        );
      }

      const productIds = orderDto.products.map((product) => product.productId);
      const products = await this.productService.findByIds(productIds);

      const productMap = new Map(
        products.map((product) => [product.id, product]),
      );

      const orderProducts = orderDto.products.map((productDto) => {
        const product = productMap.get(productDto.productId);

        if (!product) {
          throw new BadRequestException(
            `Product with ID ${productDto.productId} not found`,
          );
        }

        return this.orderProductRepo.create({
          product,
          price: product.price,
          quantity: productDto.quantity,
        });
      });

      const totalPrice = orderProducts.reduce(
        (sum, orderProduct) => sum + orderProduct.price * orderProduct.quantity,
        0,
      );

      const orderData = {
        ...orderDto,
        totalPrice,
        products: orderProducts,
      };

      const order = existingOrder
        ? this.orderRepo.merge(existingOrder, orderData)
        : this.orderRepo.create(orderData);

      return await this.orderRepo.save(order);
    } catch (error) {
      Logger.error(`Failed to process order: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        `Failed to process order: ${error.message}`,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepo.delete(id);
  }
}
