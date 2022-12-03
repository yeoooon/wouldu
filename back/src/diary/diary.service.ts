import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendService } from 'src/friend/friend.service';
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
    diary.userId = currentUserId;
    diary.content = content;
    const dt = new Date();
    diary.date =
      dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();

    const isDiaryExist = await this.checkDiary(currentUserId, diary.date);
    if (isDiaryExist) {
      throw new BadRequestException('오늘 일기를 이미 작성했습니다.');
    }

    return this.diaryDAO.createOne(diary);
  }

  async checkDiary(currentUserId: string, date: string) {
    const diary = await this.diaryDAO.getMany('userId=:userId and date=:date', {
      userId: currentUserId,
      date: date,
    });
    return diary.length !== 0;
  }

  async findDiaryList(currentUserId: string) {
    const friendId = await this.friendService.findFriendId(currentUserId);
    const diaries = await this.diaryDAO.getMany('diary.friendId=:friendId', {
      friendId,
    });
    const title = await this.friendService.findTitle(friendId);
    return {
      title: title,
      diaries: diaries,
    };
  }

  async findDiaryByDate(currentUserId: string, date: string) {
    const friendId = await this.friendService.findFriendId(currentUserId);
    const diaries = await this.diaryDAO.getMany(
      'diary.friendId=:friendId and date=:date',
      {
        friendId: friendId,
        date: date,
      },
    );
    const title = await this.friendService.findTitle(friendId);
    return {
      title: title,
      diaries: diaries,
    };
  }

  async findDiaryByMonth(currentUserId: string, monthString: string) {
    const friendId = await this.friendService.findFriendId(currentUserId);
    const diaries = await this.diaryDAO.getMany(
      'diary.friendId=:friendId and date like :date',
      {
        friendId: friendId,
        date: monthString + '%',
      },
    );
    const title = await this.friendService.findTitle(friendId);
    return {
      title: title,
      diaries: diaries,
    };
  }
}