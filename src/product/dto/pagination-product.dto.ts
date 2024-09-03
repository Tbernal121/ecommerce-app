import { IsOptional, IsPositive, Min } from 'class-validator';

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @Min(1)
  page?: number = 1;
}
