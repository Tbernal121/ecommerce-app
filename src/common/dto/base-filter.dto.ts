import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Min } from 'class-validator';

export class BaseFilterDto {
  @ApiProperty({ description: 'Number of items per page', default: 10 })
  @IsOptional()
  @Min(1)
  readonly limit?: number = 10;

  @ApiProperty({ description: 'Page number', default: 1 })
  @IsOptional()
  @Min(1)
  readonly page?: number = 1;
}
