import { IsString, IsNotEmpty, IsPhoneNumber, IsEmail } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
