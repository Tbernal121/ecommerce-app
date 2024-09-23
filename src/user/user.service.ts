import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { CustomerService } from '../customer/customer.service';
import { userSeedData } from './data/user.data';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,

    private readonly customerService: CustomerService,

    private readonly dataSource: DataSource,
  ) {}

  async findAll(relations: string[] = []): Promise<User[]> {
    try {
      return await this.userRepo.find({ relations });
    } catch (error) {
      this.logger.error(
        `Failed to retrieve users: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to retrieve users');
    }
  }

  async findOne(id: string, relations: string[] = []): Promise<User> {
    try {
      const user = await this.userRepo.findOne({ where: { id }, relations });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      this.logger.error(
        `Failed to retrieve user with id ${id}: ${error.message}`,
        error.stack,
      );
      if (error instanceof NotFoundException) {
        throw error; // Re-throw specific NotFoundException
      }
      throw new InternalServerErrorException('Failed to retrieve the user');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepo.create(createUserDto);
      if (createUserDto.customerId) {
        const customer = await this.customerService.findOne(
          createUserDto.customerId,
        );
        newUser.customer = customer;
      }
      return await this.userRepo.save(newUser);
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);
      if (updateUserDto.customerId) {
        const customer = await this.customerService.findOne(
          updateUserDto.customerId,
        );
        user.customer = customer;
      }
      this.userRepo.merge(user, updateUserDto);
      return await this.userRepo.save(user);
    } catch (error) {
      this.logger.error(
        `Failed to update user with id ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const user = await this.findOne(id);
      await this.userRepo.remove(user);
    } catch (error) {
      this.logger.error(
        `Failed to remove user with id ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to remove user');
    }
  }

  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();
    const logger = new Logger('User Seed');

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const userData of userSeedData) {
        const existingUser = await queryRunner.manager.findOne(User, {
          where: { id: userData.id },
        });
        if (!existingUser) {
          const user = queryRunner.manager.create(User, userData);
          // hash the password before saving
          // user.password = await this.hashPassword(userData.password);
          await queryRunner.manager.save(user);
        }
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      logger.error(`Failed to seed users: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to seed users');
    } finally {
      await queryRunner.release();
    }
  }
}
