import { Injectable } from '@nestjs/common';
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

  sendFriendRequest(code: string) {
    const fromUser = '';
    const toUser = this.userService.findOneByCode(code);
  }

  findFriendRequest() {}

  acceptFriendRequest() {}
}
