import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
  IsUUID,
} from 'class-validator';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @IsUrl()
  image?: string; // URL of the image

  @CreateDateColumn({ type: 'timestamp' })
  dateAdded: Date;

  // parentCategory?: Category; // reference to a parent category (optional)
  // subCategories?: Category[]; // array of subcategories (optional)
  // products?: Product[]; // array of associated products (optional)
}
