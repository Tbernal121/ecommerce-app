import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: "category's name", example: 'Technology' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: "category's description",
    example: 'All things tech, from gadgets to software',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({
    description: `URL of the category's image`,
    example: 'https://example.com/tech.png',
  })
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @ApiProperty({
    description: `ID of the parent category`,
    example: 'a1f5c10d-58cc-4372-b567-0e02b2c3d479',
  })
  @IsOptional()
  @IsUUID()
  readonly parentCategoryId?: string;

  @ApiProperty({
    description: `IDs of the subcategories`,
    example: [
      'a1f5c10d-58cc-4372-b567-0e02b2c3d479',
      '0ce098c5-b311-4279-8a7a-9ad9cdd52904',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  readonly subCategories?: string[];

  @ApiProperty({
    description: `IDs of the products`,
    example: [
      'e7b19f90-faf0-4d04-8b49-1b71fd0a8e0b',
      'dd37e2d9-786e-4260-b7df-ef45f732345e',
    ],
  })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  readonly productsIds?: string[];
}
