import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('인증 API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UseGuards()
  @Post('login')
  @ApiOperation({
    summary: '로그인 API',
    description: 'email, password를 입력하여 로그인하고 유저 반환',
  })
  @ApiBody({
    description: `{
    "email":"your email",
    "password":"your password"
    }`,
  })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.login({ email, password });
    if (user === null) {
      throw new NotFoundException('이메일이나 비밀번호가 틀렸습니다.');
    }
    return user;
  }
}
