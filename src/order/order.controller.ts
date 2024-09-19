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

import { OrderService } from './order.service';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { ApiRelationsQuery } from '../common/decorators/api-relations-query.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary: 'Create order',
    description: 'Create a new order',
  })
  @ApiResponse({ status: 201, type: Order })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all orders',
    description: 'Retrieve a list of all orders',
  })
  @ApiRelationsQuery()
  @ApiResponse({ status: 200, type: [Order] })
  async findAll(@Query('relations') relations?: string): Promise<Order[]> {
    const parsedRelations = relations ? relations.split(',') : [];
    return this.orderService.findAll(parsedRelations);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an order by ID',
    description: 'Retrieve a single order by its ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the order to retrieve',
    example: 'e9c74a41-c1f2-4860-be53-85b3fa03ff35',
  })
  @ApiRelationsQuery()
  @ApiResponse({ status: 200, type: Order })
  async findOne(
    @Param('id') id: string,
    @Query('relations') relations?: string,
  ): Promise<Order> {
    const parsedRelations = relations ? relations.split(',') : [];
    return this.orderService.findOne(id, parsedRelations);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an order',
    description: 'Update an existing order by its ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the order to update',
    example: 'e9c74a41-c1f2-4860-be53-85b3fa03ff35',
  })
  @ApiResponse({ status: 200, type: Order })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Put(':id/status')
  @ApiOperation({
    summary: 'Update an order status',
    description: 'Update an existing order status by its ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the order to update',
    example: 'e9c74a41-c1f2-4860-be53-85b3fa03ff35',
  })
  @ApiResponse({ status: 200, type: Order })
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    return this.orderService.updateStatus(id, updateOrderStatusDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an order',
    description: 'Delete an order by its ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'The ID of the order to delete',
    example: 'e9c74a41-c1f2-4860-be53-85b3fa03ff35',
  })
  @ApiResponse({ status: 200 })
  async remove(@Param('id') id: string): Promise<void> {
    return this.orderService.remove(id);
  }
}
