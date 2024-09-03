import { IsOptional, IsPositive, Min, ValidateIf } from 'class-validator';

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsPositive()
  minPrice?: number;

  @ValidateIf((product) => product.minPrice)
  @IsPositive()
  maxPrice: number;
}
