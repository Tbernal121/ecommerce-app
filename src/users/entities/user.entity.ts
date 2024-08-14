import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

import { Customer } from '../../customer/customer.entity';

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

  @Column({ type: 'varchar', length: 50, nullable: false })
  @IsNotEmpty()
  @IsString()
  role: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn()
  customer?: Customer;
}
