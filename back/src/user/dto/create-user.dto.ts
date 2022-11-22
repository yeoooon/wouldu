import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  socialId: string;

  @IsString()
  @IsOptional()
  profileImgUrl: string;

  @IsString()
  signupVerifyToken: string;
}
