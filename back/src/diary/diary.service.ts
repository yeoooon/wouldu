import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendService } from 'src/friend/friend.service';
import { Repository } from 'typeorm';
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
    diary.date = new Date();

    const isDiaryExist = await this.checkDiary(currentUserId, diary.date);
    if (isDiaryExist) {
      throw new BadRequestException('오늘 일기를 이미 작성했습니다.');
    }

    return this.diaryDAO.createOne(diary);
  }

  async checkDiary(currentUserId: string, date: Date) {
    const diary = await this.diaryDAO.getMany({
      where: {
        authorId: currentUserId,
        date: new Date(
          date.getFullYear() +
            '-' +
            (date.getMonth() + 1) +
            '-' +
            date.getDate(),
        ),
      },
    });
    return diary.length !== 0;
  }

  async findDiaryList(currentUserId: string) {
    const friendId = await this.friendService.findFriendId(currentUserId);
    return this.diaryDAO.getMany({ where: { friendId: friendId } });
  }

  async findDiaryByDate(currentUserId: string, date: string) {
    const friendId = await this.friendService.findFriendId(currentUserId);
    return this.diaryDAO.getMany({
      where: { friendId: friendId, date: new Date(date) },
    });
  }
}
