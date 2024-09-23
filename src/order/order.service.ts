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
import { DataSource, Repository } from 'typeorm';

import { Order } from './entities/order.entity';
import { OrderProduct } from './entities/order-product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductService } from '../product/product.service';
import { orderSeedData } from './data/order.data';
import { orderProductSeedData } from './data/order-product.data';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderProduct)
    private readonly orderProductRepo: Repository<OrderProduct>,

    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,

    private readonly dataSource: DataSource,
  ) {}

  async findAll(relations: string[] = []): Promise<Order[]> {
    try {
      return await this.orderRepo.find({ relations });
    } catch (error) {
      this.logger.error(
        `Failed to retrieve orders: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to retrieve orders');
    }
  }

  async findOne(id: string, relations: string[] = []): Promise<Order> {
    try {
      const order = await this.orderRepo.findOne({ where: { id }, relations });
      if (!order) {
        throw new NotFoundException(`Order with id ${id} not found`);
      }
      return order;
    } catch (error) {
      this.logger.error(
        `Failed to retrieve order with id ${id}: ${error.message}`,
        error.stack,
      );
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to retrieve the order');
    }
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return await this.processOrder(createOrderDto);
    } catch (error) {
      this.logger.error(
        `Failed to create order: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to create order');
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    try {
      const order = await this.findOne(id);
      console.log('existing order:', order);
      this.orderRepo.merge(order, updateOrderDto);
      return await this.orderRepo.save(order);
    } catch (error) {
      this.logger.error(
        `Failed to update order with id ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to update order');
    }
  }

  async updateStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    try {
      const order = await this.findOne(id);

      if (order.status !== updateOrderStatusDto.status) {
        order.status = updateOrderStatusDto.status;
        await this.orderRepo.save(order);
      }

      return order;
    } catch (error) {
      this.logger.error(
        `Failed to update status of order with id ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to update order status');
    }
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

        // const numericPrice =
        //   typeof product.price === 'string'
        //     ? parseFloat(product.price)
        //     : product.price;

        return this.orderProductRepo.create({
          product,
          price: product.price, // price: numericPrice,
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
      this.logger.error(
        `Failed to process order: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to process order');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const order = await this.findOne(id);
      await this.orderRepo.remove(order);
    } catch (error) {
      this.logger.error(
        `Failed to remove order with id ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to remove order');
    }
  }

  async seed(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    const logger = new Logger('Order Seed');

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const orderData of orderSeedData) {
        const existingOrder = await queryRunner.manager.findOne(Order, {
          where: { id: orderData.id },
        });
        if (!existingOrder) {
          const order = queryRunner.manager.create(Order, orderData);
          await queryRunner.manager.save(order);
        }
      }

      for (const orderProductData of orderProductSeedData) {
        const existingOrderProduct = await queryRunner.manager.findOne(
          OrderProduct,
          {
            where: { id: orderProductData.id },
          },
        );
        if (!existingOrderProduct) {
          const product = await this.productService.findOne(
            orderProductData.product.id,
          );
          const orderProduct = queryRunner.manager.create(OrderProduct, {
            ...orderProductData,
            price: product.price,
          });
          await queryRunner.manager.save(orderProduct);
        }
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      logger.error(`Failed to seed orders: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to seed orders');
    } finally {
      await queryRunner.release();
    }
  }
}
