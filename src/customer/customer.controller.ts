import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @ApiOperation({
    summary: 'List of customers',
    description: 'Retrieve a list of all customers',
  })
  findAll(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get customer by ID',
    description: 'Retrieve a single customer by their ID',
  })
  findOne(@Param('id') id: string): Promise<Customer> {
    return this.customerService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create customer',
    description: 'Create a new customer',
  })
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update customer',
    description: 'Update an existing customer by their ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete customer',
    description: 'Delete a customer by their ID',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.customerService.remove(id);
  }
}
