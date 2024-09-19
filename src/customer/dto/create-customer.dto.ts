import { IsString, IsNotEmpty, IsPhoneNumber, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ description: "customer's name", example: 'Harry' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: "customer's last name", example: 'Potter' })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    description: "customer's phone number",
    example: '+1234567890',
  })
  @IsPhoneNumber()
  readonly phone: string;

  @ApiProperty({
    description: "customer's email",
    example: 'harry.potter@mail.com',
  })
  @IsEmail()
  readonly email: string;
}
