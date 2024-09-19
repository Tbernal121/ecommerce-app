import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { Customer } from './customer.entity';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiRelationsQuery } from '../common/decorators/api-relations-query.decorator';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @ApiOperation({
    summary: 'List of customers',
    description: 'Retrieve a list of all customers',
  })
  @ApiRelationsQuery()
  @ApiResponse({ status: 200, type: [Customer] })
  async findAll(@Query('relations') relations?: string): Promise<Customer[]> {
    const parsedRelations = relations ? relations.split(',') : [];
    return this.customerService.findAll(parsedRelations);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get customer by ID',
    description: 'Retrieve a single customer by their ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the customer to retrieve',
    example: 'e4edf922-1957-4131-b155-810d7b3be67b',
  })
  @ApiRelationsQuery()
  @ApiResponse({ status: 200, type: Customer })
  async findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
  ): Promise<Customer> {
    const parsedRelations = relations ? relations.split(',') : [];
    return this.customerService.findOne(id, parsedRelations);
  }

  @Post()
  @ApiOperation({
    summary: 'Create customer',
    description: 'Create a new customer',
  })
  @ApiResponse({ status: 201, type: Customer })
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update customer',
    description: 'Update an existing customer by their ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the customer to update',
    example: 'e4edf922-1957-4131-b155-810d7b3be67b',
  })
  @ApiResponse({ status: 200, type: Customer })
  async update(
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
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the customer to delete',
    example: 'e4edf922-1957-4131-b155-810d7b3be67b',
  })
  @ApiResponse({ status: 200 })
  async remove(@Param('id') id: string): Promise<void> {
    return this.customerService.remove(id);
  }
}
