import { IsEmail, IsNotEmpty } from 'class-validator';

class IUpdatePlayerDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone_number: string;
}

export { IUpdatePlayerDTO };
