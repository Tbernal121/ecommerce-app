import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

import { UserRole } from '../enum/role.enum';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRole)
  readonly role: UserRole;

  @IsOptional()
  @IsUUID()
  @IsNotEmpty()
  readonly customerId: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
