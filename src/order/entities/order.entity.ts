import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { IsNotEmpty, IsDate, IsEnum, IsNumber } from 'class-validator';

import { OrderStatusEnum } from '../enum/order-status.enum';
import { OrderProduct } from 'src/order/entities/order-product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamptz', nullable: false })
  @IsNotEmpty()
  @IsDate()
  orderDate: Date;

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

  @ManyToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  products: OrderProduct[];
}
