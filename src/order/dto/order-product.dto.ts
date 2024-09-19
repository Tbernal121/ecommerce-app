import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, Min } from 'class-validator';

export class OrderProductDto {
  @ApiProperty({
    description: 'Product Id',
    example: 'dd37e2d9-786e-4260-b7df-ef45f732345e',
  })
  @IsUUID()
  readonly productId: string;

  @ApiProperty({ description: 'Product quantity', example: 2 })
  @Min(1)
  readonly quantity: number;
}
