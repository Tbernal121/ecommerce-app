import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  Tree,
  TreeParent,
  TreeChildren,
  DeleteDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

import { Product } from '../product/product.entity';

@Entity('categories')
@Tree('closure-table')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsUrl()
  image: string; // URL of the image

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @ManyToMany(() => Product, (product) => product.categories, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'categories_products' })
  products: Product[];

  @TreeParent()
  parentCategory?: Category;

  @TreeChildren()
  subCategories?: Category[];
}
