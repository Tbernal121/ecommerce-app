import { IsString, IsNumber, IsUrl, IsNotEmpty, IsOptional, IsPositive, IsDate } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types'
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
  readonly image: string; // an url of the image

  @IsNotEmpty()
  @IsString({ each: true }) // validate each item in the array as string
  readonly category: string;

  @IsOptional()
  @IsString({ each: true }) // validate each item in the array as string
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
  @IsString({ each: true }) // validate each item in the array as string
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

export class UpdateProductDto extends PartialType(OmitType(CreateProductDto, ['dateAdded'] as const)) {}

/*
export class UpdateProductDto {
    @IsNotEmpty() // Make id required
    @IsNumber()
    @IsPositive()
    readonly id: number;
  
    @IsOptional()
    @IsString()
    readonly name?: string;
  
    @IsOptional()
    @IsString()
    readonly description?: string;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly price?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly stock?: number;
  
    @IsOptional()
    @IsString()
    readonly brand?: string;
  
    @IsOptional()
    @IsUrl()
    readonly image?: string; // Optional image URL update
  
    @IsOptional()
    @IsString()
    readonly category?: string;
  
    @IsOptional()
    @IsString({ each: true }) // validate each item in the array as string
    readonly tags?: string[]; // Optional update to tags
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    readonly discount?: number;
  
    @IsOptional()
    @IsNumber()
    @IsPositive()
    // add a raging range
    readonly rating?: number; // Optional update to rating
  
    @IsOptional()
    @IsString({ each: true }) // validate each item in the array as string
    readonly reviews?: string[]; // Optional update to reviews
  
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
  
    // Removed dateAdded as it's assumed to be immutable
  }
  */