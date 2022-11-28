import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FriendService } from './friend.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { SendFriendRequestDTO } from './dto/send-friend-request.dto';

@Controller('friend')
@ApiTags('친구 API')
@ApiBearerAuth('access-token')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('/request')
  @ApiOperation({
    summary: '친구 요청 API',
    description: '친구 코드를 통해 친구 요청을 보낸다.',
  })
  @UseGuards(AuthGuard('jwt'))
  sendFriendRequest(
    @Req() request: Request,
    @Body() sendFriendRequestDTO: SendFriendRequestDTO,
  ) {
    const { code } = sendFriendRequestDTO;
    return this.friendService.sendFriendRequest(request.user['userId'], code);
  }

  @Get('/request')
  @ApiOperation({
    summary: '친구 요청 확인 API',
    description: '친구 요청 받은 목록을 확인한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  findFriendRequest(@Req() request: Request) {
    return this.friendService.findFriendRequest(request.user['userId']);
  }

  @Put('/request/:id')
  @ApiOperation({
    summary: '친구 수락 API',
    description: '친구 요청을 수락한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  acceptFriendRequest(
    @Req() request: Request,
    @Query('requestId') requestId: number,
  ) {
    return this.friendService.acceptFriendRequest(
      request.user['userId'],
      requestId,
    );
  }
}
