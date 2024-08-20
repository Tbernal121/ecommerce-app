import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { CustomerService } from '../customer/customer.service';
import { userSeedData } from './data/user.data';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,

    private readonly customerService: CustomerService,
  ) {}

  async findAll(relations: string[] = []): Promise<User[]> {
    return await this.userRepo.find({ relations: relations });
  }

  async findOne(id: string, relations: string[] = []): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepo.create(createUserDto);
    if (createUserDto.customerId) {
      const customer = await this.customerService.findOne(
        createUserDto.customerId,
      );
      newUser.customer = customer;
    }
    return await this.userRepo.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    if (updateUserDto.customerId) {
      const customer = await this.customerService.findOne(
        updateUserDto.customerId,
      );
      user.customer = customer;
    }
    this.userRepo.merge(user, updateUserDto);
    return await this.userRepo.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepo.delete(id);
  }

  async seed() {
    for (const userData of userSeedData) {
      const existingUser = await this.userRepo.findOne({
        where: { email: userData.email },
      });

      if (!existingUser) {
        const user = this.userRepo.create(userData);
        // hash the password before saving
        // user.password = await this.hashPassword(userData.password);
        await this.userRepo.save(user);
      }
    }
  }
}
