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
import { ApiOperation } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({
    summary: 'Create order',
    description: 'Create a new order',
  })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List all orders',
    description: 'Retrieve a list of all orders',
  })
  async findAll(@Query('relations') relations?: string): Promise<Order[]> {
    const parsedRelations = relations ? relations.split(',') : [];
    return this.orderService.findAll(parsedRelations);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an order by ID',
    description: 'Retrieve a single order by its ID',
  })
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
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an order',
    description: 'Delete an order by its ID',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.orderService.remove(id);
  }
}
