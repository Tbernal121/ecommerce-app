import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  Min,
  Max,
} from 'class-validator';

import { IProduct } from './interfaces/product.interface';
import { Brand } from '../brand/brand.entity';
import { OrderProduct } from '../order/entities/order-product.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: 'text', nullable: false })
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column('int', { nullable: false })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  @IsString()
  image: string; // URL of the image

  @Column('simple-array', { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @Column('decimal', { precision: 2, scale: 1, nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @Column('simple-array', { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  reviews?: string[];

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  height?: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  width?: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  depth?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsString()
  manufacturer?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.products, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products, {
    onDelete: 'CASCADE',
  })
  categories: Category[];

  @ManyToMany(() => OrderProduct, (orderProduct) => orderProduct.product, {
    cascade: true,
    onDelete: 'RESTRICT',
  })
  orders: OrderProduct[];
}
