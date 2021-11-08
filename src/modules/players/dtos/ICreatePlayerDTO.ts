import { IsEmail, IsNotEmpty } from 'class-validator';

class ICreatePlayerDTO {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone_number: string;
}

export { ICreatePlayerDTO };
