import {
  IsString,
  IsUrl,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { IBrand } from '../interfaces/brand.interface';

export class CreateBrandDto implements IBrand {
  @ApiProperty({ description: "Brand's name", example: 'Potterverse' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: `URL of the brand's image`,
    example: 'https://example.com/potterverse.png',
  })
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @ApiProperty({
    description: `URL of the Brand's website`,
    example: 'https://potterverse.com',
  })
  @IsOptional()
  @IsUrl()
  readonly website?: string;

  @ApiProperty({
    description: `Brand's description`,
    example: 'Magical merchandise and memorabilia for every wizard',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ description: `Brand's rating`, example: 4.9 })
  @IsOptional()
  @Min(0)
  @Max(5)
  readonly rating?: number;
}
