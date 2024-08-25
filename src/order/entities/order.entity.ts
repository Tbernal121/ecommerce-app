import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';

import { OrderStatusEnum } from '../enum/order-status.enum';
import { OrderProduct } from './order-product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: OrderStatusEnum,
    default: OrderStatusEnum.PENDING,
  })
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
  })
  products: OrderProduct[];
}
