import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsArray,
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
  @IsString({ each: true })
  readonly productsIds: string[];
}
