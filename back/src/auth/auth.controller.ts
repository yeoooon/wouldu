import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
@ApiTags('인증 API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
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
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
