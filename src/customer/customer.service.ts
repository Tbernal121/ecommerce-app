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
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,

    private readonly dataSource: DataSource,
  ) {}

  async findAll(relations: string[] = []): Promise<Customer[]> {
    return await this.customerRepo.find({ relations: relations });
  }

  async findOne(id: string, relations: string[] = []): Promise<Customer> {
    const customer = await this.customerRepo.findOne({
      where: { id },
      relations,
    });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
    return customer;
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const newCustomer = this.customerRepo.create(createCustomerDto);
    return await this.customerRepo.save(newCustomer);
  }

  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.findOne(id);
    this.customerRepo.merge(customer, updateCustomerDto);
    return await this.customerRepo.save(customer);
  }

  async remove(id: string): Promise<void> {
    const customer = await this.findOne(id);
    await this.customerRepo.delete(id);
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
