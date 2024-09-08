import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsNotEmpty()
  @IsUrl()
  readonly image: string;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  readonly productsIds?: string[];
}
