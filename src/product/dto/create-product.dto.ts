import {
  IsString,
  IsUrl,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Min,
  Max,
  IsArray,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IProduct } from '../interfaces/product.interface';

export class CreateProductDto implements IProduct {
  @ApiProperty({
    description: 'Product name',
    example: 'Time-Traveling Toaster',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Toaster with time travel capabilities',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'Product price', example: 49.99 })
  @IsPositive()
  readonly price: number;

  @ApiProperty({ description: 'Product stock', example: 15 })
  @IsPositive()
  readonly stock: number;

  @ApiProperty({
    description: 'URL of the Product image',
    example: 'https://example.com/toaster.png',
  })
  @IsUrl()
  readonly image: string;

  @ApiProperty({
    description: 'Product tags',
    example: ['toaster', 'magic'],
  })
  @IsOptional()
  @IsString({ each: true })
  readonly tags?: string[];

  @ApiProperty({ description: 'Product discount', example: 10 })
  @IsOptional()
  @IsPositive()
  readonly discount?: number;

  @ApiProperty({ description: 'Product rating', example: 4.5 })
  @IsOptional()
  @Min(0)
  @Max(5)
  readonly rating?: number;

  @ApiProperty({ description: 'Product reviews', example: ['Great product!'] })
  @IsOptional()
  @IsString({ each: true })
  readonly reviews?: string[];

  @ApiProperty({ description: 'Product weight', example: 3.5 })
  @IsOptional()
  @IsPositive()
  readonly weight?: number;

  @ApiProperty({ description: 'Product height', example: 12 })
  @IsOptional()
  @IsPositive()
  readonly height?: number;

  @ApiProperty({ description: 'Product width', example: 8 })
  @IsOptional()
  @IsPositive()
  readonly width?: number;

  @ApiProperty({ description: 'Product depth', example: 2.5 })
  @IsOptional()
  @IsPositive()
  readonly depth?: number;

  @ApiProperty({
    description: 'Product manufacturer',
    example: '',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly manufacturer?: string;

  @ApiProperty({ description: 'Product brand', example: 'Weasley Company' })
  @IsOptional()
  @IsUUID()
  readonly brandId?: string;

  @ApiProperty({ description: 'Product categories', example: [] })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  readonly categoriesIds?: string[];
}
