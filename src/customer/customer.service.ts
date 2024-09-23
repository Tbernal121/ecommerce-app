import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { customerSeedData } from './data/customer.data';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,

    private readonly dataSource: DataSource,
  ) {}

  async findAll(relations: string[] = []): Promise<Customer[]> {
    try {
      return await this.customerRepo.find({ relations });
    } catch (error) {
      this.logger.error(
        `Failed to retrieve customers: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to retrieve customers');
    }
  }

  async findOne(id: string, relations: string[] = []): Promise<Customer> {
    try {
      const customer = await this.customerRepo.findOne({
        where: { id },
        relations,
      });
      if (!customer) {
        throw new NotFoundException(`Customer with id ${id} not found`);
      }
      return customer;
    } catch (error) {
      this.logger.error(
        `Failed to retrieve customer with id ${id}: ${error.message}`,
        error.stack,
      );
      if (error instanceof NotFoundException) {
        throw error; // Re-throw specific NotFoundException
      }
      throw new InternalServerErrorException('Failed to retrieve the customer');
    }
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const newCustomer = this.customerRepo.create(createCustomerDto);
      return await this.customerRepo.save(newCustomer);
    } catch (error) {
      this.logger.error(
        `Failed to create customer: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to create customer');
    }
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    try {
      const customer = await this.findOne(id);
      this.customerRepo.merge(customer, updateCustomerDto);
      return await this.customerRepo.save(customer);
    } catch (error) {
      this.logger.error(
        `Failed to update customer with id ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to update customer');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const customer = await this.findOne(id);
      await this.customerRepo.remove(customer);
    } catch (error) {
      this.logger.error(
        `Failed to remove customer with id ${id}: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException('Failed to remove customer');
    }
  }

  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();
    const logger = new Logger('Customer Seed');

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const customerData of customerSeedData) {
        const existingCustomer = await queryRunner.manager.findOne(Customer, {
          where: { id: customerData.id },
        });
        if (!existingCustomer) {
          const customer = queryRunner.manager.create(Customer, customerData);
          await queryRunner.manager.save(customer);
        }
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      logger.error(`Failed to seed customers: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to seed customers');
    } finally {
      await queryRunner.release();
    }
  }
}
