import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

import { IBrand } from './interfaces/brand.interface';
import { Product } from '../product/product.entity';

@Entity('brands')
export class Brand implements IBrand {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  @IsString()
  image: string; // URL of the image

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsUrl()
  website?: string;

  @Column('decimal', { precision: 2, scale: 1, nullable: true })
  @IsOptional()
  @Min(0)
  @Max(5)
  rating?: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}
