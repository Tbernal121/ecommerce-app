import { IsOptional, IsPositive, Min } from 'class-validator';

export class BaseFilterDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  readonly limit?: number = 10;

  @IsOptional()
  @Min(1)
  readonly page?: number = 1;
}
