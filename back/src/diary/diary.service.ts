import { Injectable } from '@nestjs/common';
import { FriendService } from 'src/friend/friend.service';
import { Like } from 'typeorm';
import { DiaryDAO } from './dao/diary.dao';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { Diary } from './entities/diary.entity';

@Injectable()
export class DiaryService {
  constructor(
    private readonly diaryDAO: DiaryDAO,
    private readonly friendService: FriendService,
  ) {}

  async create(currentUserId: string, createDiaryDto: CreateDiaryDto) {
    const diary = new Diary();
    const { content } = createDiaryDto;
    diary.friendId = await this.friendService.findFriendId(currentUserId);
    diary.authorId = currentUserId;
    diary.content = content;
    const dt = new Date();
    diary.date =
      dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
    return this.diaryDAO.createOne(diary);
  }

  async findDiaryList(currentUserId: string) {
    const friendId = await this.friendService.findFriendId(currentUserId);
    return this.diaryDAO.getMany({ where: { friendId: friendId } });
  }

  async findDiaryByDate(currentUserId: string, date: string) {
    const friendId = await this.friendService.findFriendId(currentUserId);
    return this.diaryDAO.getMany({
      where: { friendId: friendId, date: date },
    });
  }

  async findDiaryByMonth(currentUserId: string, monthString: string) {
    const friendId = await this.friendService.findFriendId(currentUserId);
    return this.diaryDAO.getMany({
      where: {
        friendId: friendId,
        date: Like(monthString + '%'),
      },
    });
  }
}
