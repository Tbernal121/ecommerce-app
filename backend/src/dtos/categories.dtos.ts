import { IsString, IsNumber, IsUrl, IsNotEmpty, IsOptional, IsPositive, IsDate } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types'

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly image?: string;
}

export class UpdateProductDto extends PartialType(CreateCategoryDto) {}