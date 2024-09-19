import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional } from 'class-validator';

import { CreateProductDto } from './create-product.dto';
import { Category } from '../../category/category.entity';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['categoriesIds'] as const),
) {
  @ApiProperty({
    description: 'The categories to add to the product',
    example: [],
  })
  @IsOptional()
  @IsArray()
  readonly categoriesIdsToAdd?: Category['id'][];

  @ApiProperty({
    description: 'The categories to delete from the product',
    example: [],
  })
  @IsOptional()
  @IsArray()
  @IsBoolean()
  readonly categoriesIdsToDelete?: Category['id'][];
}
