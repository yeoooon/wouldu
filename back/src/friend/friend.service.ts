import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
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
    const fromUser = await this.userService.findOneById(currentUserId);
    const toUser = await this.userService.findOneByCode(code);
    await this.verifyRequest(fromUser, toUser);
    const friendRequest = new FriendRequest();
    friendRequest.fromUserId = fromUser.id;
    friendRequest.toUserId = toUser.id;
    friendRequest.requestProgress = 0;
    await this.friendRequestRepository.save(friendRequest);
    return '친구 요청 보냄';
  }

  async verifyRequest(fromUser: User, toUser: User) {
    if (!toUser || fromUser.id === toUser.id) {
      throw new NotFoundException('유효하지 않은 코드입니다.');
    }

    const isFromFriendExist = await this.findFriendId(fromUser.id);
    if (isFromFriendExist !== null) {
      throw new BadRequestException('from : 이미 친구가 있습니다.');
    }

    const isFromFriendRequestExist = await this.findSendedFriendRequest(
      fromUser.id,
    );
    isFromFriendRequestExist.forEach((request) => {
      if (request.toUserId === toUser.id && request.requestProgress === 0) {
        throw new BadRequestException(
          'from : 같은 유저에게 보낸 대기중인 요청이 있습니다.',
        );
      }
    });

    const isToFriendExist = await this.findFriendId(toUser.id);
    if (isToFriendExist !== null) {
      throw new BadRequestException('to : 이미 친구가 있는 유저입니다.');
    }
  }

  async findReceivedFriendRequest(currentUserId: string) {
    const friendRequestList = await this.friendRequestRepository.find({
      where: { toUserId: currentUserId, requestProgress: 0 },
    });
    return friendRequestList;
  }

  async findSendedFriendRequest(currentUserId: string) {
    const friendRequestList = await this.friendRequestRepository.find({
      where: { fromUserId: currentUserId, requestProgress: 0 },
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

    const receivedFriendRequests = await this.findReceivedFriendRequest(
      currentUserId,
    );
    receivedFriendRequests.forEach((request) => {
      request.requestProgress = 3;
      this.friendRequestRepository.save(request);
    });

    const friend = new Friend();
    friend.fromUserId = friendRequest.fromUserId;
    friend.toUserId = friendRequest.toUserId;
    await this.friendRepository.save(friend);
    return '수락 완료';
  }

  async rejectFriendRequest(currentUserId: string, requestId: number) {
    const friendRequest = await this.friendRequestRepository.findOne({
      where: { id: requestId },
    });
    if (friendRequest.toUserId !== currentUserId) {
      throw new UnauthorizedException('거절할 권한이 없습니다.');
    }
    friendRequest.requestProgress = 2;
    await this.friendRequestRepository.save(friendRequest);
    return '거절 완료';
  }

  async findFriendId(userId: string) {
    const from = await this.friendRepository.findOne({
      where: { fromUserId: userId },
    });
    const to = await this.friendRepository.findOne({
      where: { toUserId: userId },
    });
    const friend = from === null ? to : from;
    return friend === null ? null : friend.id;
  }

  async findFriend(userId: string) {
    const friend = await this.friendRepository.findOne({
      where: [{ fromUserId: userId }, { toUserId: userId }],
    });

    return friend;
  }
}
