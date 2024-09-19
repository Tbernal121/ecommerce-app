import {
  IsEnum,
  IsOptional,
  IsPositive,
  IsUUID,
  Min,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BaseFilterDto } from '../../common/dto/base-filter.dto';

enum OrderByField {
  Price = 'price',
  Id = 'id',
}

enum SortDirection {
  Ascending = 'ASC',
  Descending = 'DESC',
}

export class FilterProductDto extends BaseFilterDto {
  @ApiProperty({ description: 'Product min price', example: 10 })
  @ValidateIf((product) => product.maxPrice)
  @Min(0)
  readonly minPrice: number;

  @ApiProperty({ description: 'Product max price', example: 100 })
  @ValidateIf((product) => product.minPrice)
  @IsPositive()
  readonly maxPrice: number;

  @ApiProperty({
    description: 'Order by field',
    enum: OrderByField,
    example: OrderByField.Price,
  })
  @ValidateIf((item) => item.order)
  @IsEnum(OrderByField)
  readonly orderBy: string;

  @ApiProperty({
    description: 'Sort direction',
    enum: SortDirection,
    example: SortDirection.Ascending,
  })
  @ValidateIf((item) => item.orderBy)
  @IsEnum(SortDirection)
  readonly order: string;

  @ApiProperty({
    description: 'Product brand ID',
    example: '43e77a4d-6b4a-4456-8a13-d5f7b4e7c1c5',
  })
  @IsOptional()
  @IsUUID()
  readonly brandId: string;
}
