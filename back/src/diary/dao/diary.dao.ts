import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Diary } from '../entities/diary.entity';

@Injectable()
export class DiaryDAO {
  constructor(
    @InjectRepository(Diary) private diaryRepository: Repository<Diary>,
  ) {}

  createOne(diary: Diary) {
    return this.diaryRepository.save(diary);
  }

  getMany(options: string, data: object) {
    return this.diaryRepository
      .createQueryBuilder('diary')
      .select([
        'diary.id',
        'diary.friendId',
        'diary.userId',
        'diary.content',
        'diary.date',
        'user.nickname',
      ])
      .where(options, data)
      .innerJoin('diary.user', 'user')
      .getMany();
  }

  getOne(options: FindOneOptions<Diary>) {
    return this.diaryRepository.findOne(options);
  }
}
