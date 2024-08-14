import { IsNotEmpty, IsUUID, IsNumber, Min } from 'class-validator';

export class OrderProductDto {
  @IsNotEmpty()
  @IsUUID()
  readonly productId: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly quantity: number;
}
