import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, IsEmail, Length, IsEnum } from 'class-validator';

import { Customer } from '../customer/customer.entity';
import { UserRole } from './enum/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
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

  @Column({ type: 'enum', enum: UserRole, nullable: false })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToOne(() => Customer, (customer) => customer.user, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  customer?: Customer;
}
