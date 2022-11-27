import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDTO {
  /**
   * 이메일
   * @example 'email@email.com'
   */
  @ApiProperty()
  @IsString()
  email: string;

  /**
   * 패스워드
   * @example '12341234'
   */
  @ApiProperty()
  @IsString()
  password: string;
}
