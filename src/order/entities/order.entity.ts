import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';

import { OrderStatusEnum } from '../enum/order-status.enum';
import { OrderProduct } from './order-product.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity('orders')
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

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, {
    cascade: true,
    eager: true,
  })
  products: OrderProduct[];

  @Expose()
  get Products2() {
    if (this.products) {
      return this.products
        .filter((product) => product.quantity > 0)
        .map((product) => {
          return {
            id: product.id,
            quantity: product.quantity,
          };
        });
    }
  }
}
