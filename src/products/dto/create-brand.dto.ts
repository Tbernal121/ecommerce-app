import {
  IsString,
  IsUrl,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IBrand } from '../interfaces/brand.interface';

export class CreateBrandDto implements IBrand {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: "Brand's name" })
  readonly name: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

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
