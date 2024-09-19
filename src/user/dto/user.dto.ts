import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { UserRole } from '../enum/role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'The user email',
    example: 'harry.potter@mail.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'The user password', example: 'password' })
  @IsString()
  @IsNotEmpty()
  @Length(6)
  readonly password: string;

  @ApiProperty({
    description: 'The user role',
    enum: UserRole,
    example: UserRole.Admin,
  })
  @IsEnum(UserRole)
  readonly role: UserRole;

  @ApiProperty({
    description: 'The customer id',
    example: 'e4edf922-1957-4131-b155-810d7b3be67b',
  })
  @IsOptional()
  @IsUUID()
  readonly customerId: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
