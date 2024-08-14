import {
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

import { OrderProductDto } from './order-product.dto';
import { OrderStatusEnum } from '../enum/order-status.enum';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  readonly status: OrderStatusEnum;

  @IsNotEmpty()
  @IsNumber()
  readonly totalPrice: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  readonly products: OrderProductDto[];
}
