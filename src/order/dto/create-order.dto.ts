import { IsNotEmpty, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

import { OrderProductDto } from './order-product.dto';
import { OrderStatusEnum } from '../enum/order-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Order status',
    enum: OrderStatusEnum,
    example: OrderStatusEnum.PENDING,
  })
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  readonly status: OrderStatusEnum;

  @ApiProperty({ description: 'Order products', example: [] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  readonly products: OrderProductDto[];
}
