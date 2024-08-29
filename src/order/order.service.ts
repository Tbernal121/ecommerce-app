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
    try {
      if (!createOrderDto.products || createOrderDto.products.length === 0) {
        throw new BadRequestException(
          'Order must contain at least one product',
        );
      }

      const productIds = createOrderDto.products.map(
        (product) => product.productId,
      );

      const products = await this.productService.findByIds(productIds);

      const productMap = new Map(
        products.map((product) => [product.id, product]),
      );

      const orderProducts = createOrderDto.products.map((productDto) => {
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

      const totalPrice = orderProducts.reduce((sum, orderProduct) => {
        return sum + orderProduct.price * orderProduct.quantity;
      }, 0);

      const newOrder = this.orderRepo.create({
        ...createOrderDto,
        totalPrice,
        products: orderProducts,
      });

      return await this.orderRepo.save(newOrder);
    } catch (error) {
      Logger.error(`Failed to create order: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        `Failed to create order: ${error.message}`,
      );
    }
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
