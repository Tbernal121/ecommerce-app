import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsUUID,
} from 'class-validator';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
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
  brand: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  @IsString()
  image: string; // URL of the image

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  @IsString()
  category: string;

  @Column('simple-array', { nullable: true })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  @IsOptional()
  @IsNumber()
  discount?: number;

  @Column('decimal', { precision: 2, scale: 1, nullable: false })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @Column('simple-array', { nullable: false })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  reviews: string[];

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

  @CreateDateColumn({ type: 'timestamp' })
  dateAdded: Date;
}
