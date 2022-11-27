import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { FriendRequest } from './entities/friendRequest.entity';

@Injectable()
export class FriendService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
  ) {}

  async sendFriendRequest(currentUserId: string, code: string) {
    const fromUser = await this.userService.findOneById(currentUserId);
    const toUser = await this.userService.findOneByCode(code);

    if (!toUser) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    if (fromUser.id === toUser.id) {
      throw new UnprocessableEntityException(
        '본인 계정에 친구 신청을 할 수 없습니다.',
      );
    }

    const friendRequest = new FriendRequest();
    friendRequest.fromUserId = fromUser.id;
    friendRequest.toUserId = toUser.id;
    friendRequest.requestProgress = 0;
    await this.friendRequestRepository.save(friendRequest);
    return '친구 요청 보냄';
  }

  findFriendRequest() {}

  acceptFriendRequest() {}
}
