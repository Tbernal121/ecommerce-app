import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
  Max,
  IsArray,
} from 'class-validator';

import { IProduct } from '../interfaces/product.interface';

export class CreateProductDto implements IProduct {
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
  @IsUrl()
  readonly image: string;

  @IsOptional()
  @IsString({ each: true })
  readonly tags?: string[];

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly discount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  readonly rating?: number;

  @IsOptional()
  @IsString({ each: true })
  readonly reviews?: string[];

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
  @IsNotEmpty()
  @IsString()
  readonly manufacturer?: string;

  @IsNotEmpty()
  @IsString()
  readonly brandId: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly categoriesIds: string[];
}
