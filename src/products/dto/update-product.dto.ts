import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';

import { CreateProductDto } from './create-product.dto';
import { Category } from '../../category/category.entity';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly categoriesIdsToDelete?: Category['id'][];
}
