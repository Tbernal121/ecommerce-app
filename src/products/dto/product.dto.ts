import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsDate,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;

  @IsNotEmpty()
  @IsString()
  readonly brand: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @IsNotEmpty()
  @IsString({ each: true })
  readonly category: string;

  @IsOptional()
  @IsString({ each: true })
  readonly tags?: string[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly discount?: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  // add a raging range
  readonly rating: number;

  @IsNotEmpty()
  @IsString({ each: true })
  readonly reviews: string[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly weight?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly height?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly width?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly depth?: number;

  @IsOptional()
  @IsString()
  readonly manufacturer?: string;

  @IsDate()
  @Type(() => Date)
  readonly dateAdded: Date;
}

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['dateAdded'] as const),
) {}
