import { IsEmail } from 'class-validator';
import { IsStrongPassword } from 'class-validator';

export class authDto {
  @IsEmail()
  email: string = '';

  @IsStrongPassword()
  password: string = '';
}
