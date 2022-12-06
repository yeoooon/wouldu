import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewPasswordDTO } from './dto/new-password.dto';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({
    summary: '회원 가입 API',
    description: 'email, nickname, password를 입력하여 유저를 생성한다.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/email-verify')
  @ApiOperation({ summary: '이메일 인증 API' })
  async verifyEmail(@Query() query): Promise<string> {
    const { signupVerifyToken } = query;
    return await this.userService.verifyEmail(signupVerifyToken);
  }

  @Get()
  @ApiOperation({ summary: '전체 회원 정보 조회 API' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '특정 회원 정보 조회 API' })
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '회원 정보 수정 API' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Post('/new-password')
  @ApiOperation({
    summary: '비밀번호 찾기 API',
  })
  newPassword(@Body() newPasswordDTO: NewPasswordDTO) {
    const { email } = newPasswordDTO;
    return this.userService.newPassword(email);
  }
}
