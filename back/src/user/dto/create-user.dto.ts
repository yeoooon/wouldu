import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsOptional()
  socialId: string;

  @IsString()
  @IsOptional()
  profileImgUrl: string;
}
