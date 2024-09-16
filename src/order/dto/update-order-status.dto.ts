import { IsEnum, IsNotEmpty } from 'class-validator';
import { OrderStatusEnum } from '../enum/order-status.enum';

export class UpdateOrderStatusDto {
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;
}
