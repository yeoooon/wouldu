import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';
import { FriendRequest } from './entities/friendRequest.entity';

@Injectable()
export class FriendService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async sendFriendRequest(currentUserId: string, code: string) {
    const fromUser = await this.userService.findOneByCode(code);
    const toUser = await this.userService.findOneById(currentUserId);

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

  async findFriendRequest(currentUserId: string) {
    const friendRequestList = await this.friendRequestRepository.find({
      where: { toUserId: currentUserId },
    });
    return friendRequestList;
  }

  async acceptFriendRequest(currentUserId: string, requestId: number) {
    const friendRequest = await this.friendRequestRepository.findOne({
      where: { id: requestId },
    });
    if (friendRequest.toUserId !== currentUserId) {
      throw new UnauthorizedException('수락할 권한이 없습니다.');
    }
    friendRequest.requestProgress = 1;
    await this.friendRequestRepository.save(friendRequest);
    const friend = new Friend();
    friend.fromUserId = friendRequest.fromUserId;
    friend.toUserId = friendRequest.toUserId;
    await this.friendRepository.save(friend);
  }
}
