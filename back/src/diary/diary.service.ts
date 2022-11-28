import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiaryDAO } from './dao/diary.dao';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { Diary } from './entities/diary.entity';

@Injectable()
export class DiaryService {
  constructor(private readonly diaryDAO: DiaryDAO) {}

  async create(currentUserId: string, createDiaryDto: CreateDiaryDto) {
    const diary = new Diary();
    const { friendId, content } = createDiaryDto;
    diary.friendId = friendId;
    diary.authorId = currentUserId;
    diary.content = content;
    diary.date = new Date();
    return this.diaryDAO.createOne(diary);
  }
}
