import { IsNotEmpty, IsEmail } from 'class-validator';

class ICreatePlayerDTO {
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsEmail({ message: 'email invalid' })
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @IsNotEmpty({ message: 'phone number is required' })
  phone_number: string;
}

export { ICreatePlayerDTO };
