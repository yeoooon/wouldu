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
import * as uuid from 'uuid';

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
    const resFriendRequestList = [];
    for (const request of friendRequestList) {
      const user = await this.userService.findOneById(request.fromUserId);
      const nickname = user.nickname;
      resFriendRequestList.push({
        id: request.id,
        fromUserId: request.fromUserId,
        fromUserNickname: nickname,
        createdAt: request.createdAt,
      });
    }
    return resFriendRequestList;
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

    const fromFriend = new Friend();
    fromFriend.friendId = uuid.v4();
    fromFriend.fromUserId = friendRequest.fromUserId;
    fromFriend.toUserId = friendRequest.toUserId;
    const fromUser = await this.userService.findOneById(
      friendRequest.fromUserId,
    );
    const toUser = await this.userService.findOneById(friendRequest.toUserId);
    fromFriend.title = `${fromUser.nickname} & ${toUser.nickname} 's diary`;
    fromFriend.status = 1;
    await this.friendRepository.save(fromFriend);

    const toFriend = new Friend();
    toFriend.friendId = fromFriend.friendId;
    toFriend.fromUserId = friendRequest.toUserId;
    toFriend.toUserId = friendRequest.fromUserId;
    toFriend.title = fromFriend.title;
    toFriend.status = 1;
    await this.friendRepository.save(toFriend);
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
    const friend = await this.friendRepository.findOne({
      where: { fromUserId: userId },
    });
    return friend === null ? null : friend.friendId;
  }

  async findFriend(userId: string) {
    const me = await this.friendRepository.findOne({
      where: { fromUserId: userId },
    });

    if (me === null) {
      throw new NotFoundException('맺은 친구가 없습니다.');
    }

    return await this.friendRepository
      .createQueryBuilder('friend')
      .select('friend.id')
      .addSelect('friend.friendId')
      .addSelect('friend.fromUserId')
      .addSelect('friend.toUserId')
      .addSelect('friend.title')
      .addSelect('friend.createdAt')
      .addSelect('fromUser.nickname')
      .leftJoin(
        'friend.fromUser',
        'fromUser',
        'friend.fromUserId = fromUser.id',
      )
      .where(`friend.friendId = :friendId`, { friendId: me.friendId })
      .getMany();
  }

  async findTitle(friendId: string) {
    const friend = await this.friendRepository.findOne({ where: { friendId } });
    return friend.title;
  }

  async disconnectFriend(currentUserId: string) {
    const friendId = await this.findFriendId(currentUserId);
    await this.friendRepository
      .createQueryBuilder('friend')
      .delete()
      .where('friendId=:friendId', { friendId })
      .execute();
    return '연결 끊기 완료';
  }

  async updateDiaryTitle(currentUserId: string, title: string) {
    const friendId = await this.findFriendId(currentUserId);
    await this.friendRepository
      .createQueryBuilder('friend')
      .update(Friend)
      .set({ title: title })
      .where('friendId = :friendId', { friendId: friendId })
      .execute();
    return '다이어리 제목 수정 완료';
  }
}
