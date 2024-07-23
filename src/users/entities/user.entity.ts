import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, IsEmail, IsUUID, Length } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  @IsNotEmpty()
  @IsString()
  @Length(8)
  password: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @IsNotEmpty()
  @IsString()
  role: string;

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  dateUpdated: Date;
}
