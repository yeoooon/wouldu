import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { Diary } from './entities/diary.entity';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private diaryRepository: Repository<Diary>,
  ) {}

  async create(createDiaryDto: CreateDiaryDto) {
    const diary = new Diary();
    const { friendId, title, content, date } = createDiaryDto;
    diary.friendId = friendId;
    diary.title = title;
    diary.content = content;
    diary.date = date;
    await this.diaryRepository.save(diary);
  }
}
