import {
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

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
  @ValidateIf((product) => product.maxPrice)
  @Min(0)
  readonly minPrice: number;

  @ValidateIf((product) => product.minPrice)
  @IsPositive()
  readonly maxPrice: number;

  @ValidateIf((item) => item.order)
  @IsEnum(OrderByField)
  readonly orderBy: string;

  @ValidateIf((item) => item.orderBy)
  @IsEnum(SortDirection)
  readonly order: string;

  @IsOptional()
  @IsString()
  readonly brandId: string;
}
