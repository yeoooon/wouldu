import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FriendService } from './friend.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('friend')
@ApiTags('친구 API')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('/request')
  @ApiOperation({
    summary: '친구 요청 API',
    description: '친구 코드를 통해 친구 요청을 보낸다.',
  })
  @ApiBody({
    description: `{
    "code":"code"
    }`,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  sendFriendRequest(@Req() request: Request, @Body('code') code: string) {
    console.log(request.user);
    return this.friendService.sendFriendRequest(request.user['userId'], code);
  }

  @Get('/request')
  @ApiOperation({
    summary: '친구 요청 확인 API',
    description: '친구 요청 받은 목록을 확인한다.',
  })
  findFriendRequest() {
    return this.friendService.findFriendRequest();
  }

  @Post('/accept')
  @ApiOperation({
    summary: '친구 수락 API',
    description: '친구 요청을 수락한다.',
  })
  @ApiBody({
    description: `{
    }`,
  })
  acceptFriendRequest(@Body('code') code: string) {
    return this.friendService.acceptFriendRequest();
  }
}
