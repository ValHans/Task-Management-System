import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail({}, { message: 'Email tidak valid' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password minimal 6 karakter' })
  password: string;
}
