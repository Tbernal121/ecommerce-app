import {
  IsString,
  IsUrl,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string; // an url of the image

  @IsOptional()
  @IsUrl()
  readonly website?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly rating?: number;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
