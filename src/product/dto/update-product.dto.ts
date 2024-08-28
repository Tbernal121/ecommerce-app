import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional } from 'class-validator';

import { CreateProductDto } from './create-product.dto';
import { Category } from '../../category/category.entity';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['categoriesIds'] as const),
) {
  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly categoriesIdsToAdd?: Category['id'][];

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly categoriesIdsToDelete?: Category['id'][];
}
