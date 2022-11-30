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
import { UpdateFriendRequestDTO } from './dto/update-friend-request.dto';

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

  @Get()
  @ApiOperation({
    summary: '친구 확인 API',
    description: '현재 친구를 확인한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  findFriend(@Req() request: Request) {
    return this.friendService.findFriend(request.user['userId']);
  }

  @Get('/request')
  @ApiOperation({
    summary: '친구 요청 확인 API',
    description: '친구 요청 받은 목록을 확인한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  findFriendRequest(@Req() request: Request, @Query('side') side: string) {
    if (side === 'receive')
      return this.friendService.findReceivedFriendRequest(
        request.user['userId'],
      );
    if (side === 'send')
      return this.friendService.findSendedFriendRequest(request.user['userId']);
  }

  @Put('/request/accept')
  @ApiOperation({
    summary: '친구 수락 API',
    description: '친구 요청을 수락한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  acceptFriendRequest(
    @Req() request: Request,
    @Body() updateFriendRequestDTO: UpdateFriendRequestDTO,
  ) {
    const { requestId } = updateFriendRequestDTO;
    return this.friendService.acceptFriendRequest(
      request.user['userId'],
      requestId,
    );
  }

  @Put('/request/reject')
  @ApiOperation({
    summary: '친구 거절 API',
    description: '친구 요청을 거절한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  rejectFriendRequest(
    @Req() request: Request,
    @Body() updateFriendRequestDTO: UpdateFriendRequestDTO,
  ) {
    const { requestId } = updateFriendRequestDTO;
    return this.friendService.rejectFriendRequest(
      request.user['userId'],
      requestId,
    );
  }
}
