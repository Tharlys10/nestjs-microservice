import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

class ICreatePlayerDTO {
  @IsNotEmpty({ message: 'name is required' })
  @ApiProperty({ required: true })
  name: string;

  @IsEmail({ message: 'email invalid' })
  @IsNotEmpty({ message: 'email is required' })
  @ApiProperty({ required: true })
  email: string;

  @IsNotEmpty({ message: 'phone number is required' })
  @ApiProperty({ required: true })
  phone_number: string;
}

export { ICreatePlayerDTO };
