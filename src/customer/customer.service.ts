import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
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
}
