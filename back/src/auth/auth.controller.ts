import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
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
  async login(@Request() req, @Body() loginDTO: LoginDTO) {
    return this.authService.login(req.user);
  }
}
