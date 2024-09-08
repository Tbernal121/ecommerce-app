import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsNotEmpty, IsString, IsOptional, IsUrl } from 'class-validator';

import { Product } from '../product/product.entity';

@Entity('categories')
//@Tree('closure-table')
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
  @IsNotEmpty()
  @IsUrl()
  image: string; // URL of the image

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToMany(() => Product, (product) => product.categories, {
    onDelete: 'CASCADE',
  })
  @JoinTable({ name: 'categories_products' })
  products: Product[];

  /*// parentCategory?: Category; // reference to a parent category (optional)
  @TreeParent()
  parentCategory?: Category;

  // subCategories?: Category[]; // array of subcategories (optional)
  @TreeChildren()
  subCategories?: Category[];*/
}
