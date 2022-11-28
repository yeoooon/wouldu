import { Injectable } from '@nestjs/common';
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
    const { friendId, content } = createDiaryDto;
    diary.friendId = friendId;
    diary.authorId = currentUserId;
    diary.content = content;
    diary.date = new Date();
    return this.diaryDAO.createOne(diary);
  }

  async findDiary(currentUserId: string) {
    return this.diaryDAO.getMany({ where: {} });
  }
}
