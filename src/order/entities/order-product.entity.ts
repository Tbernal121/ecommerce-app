import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNumber, IsNotEmpty, Min } from 'class-validator';

import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column({ type: 'int' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Order, (order) => order.products, { nullable: false })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orders, { nullable: false })
  product: Product;
}
