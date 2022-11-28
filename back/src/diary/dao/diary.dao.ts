import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { Diary } from '../entities/diary.entity';

@Injectable()
export class DiaryDAO {
  constructor(
    @InjectRepository(Diary) private diaryRepository: Repository<Diary>,
  ) {}

  createOne(diary: Diary) {
    return this.diaryRepository.save(diary);
  }

  getMany(options: FindManyOptions<Diary>) {
    return this.diaryRepository.find(options);
  }

  getOne(options: FindOneOptions<Diary>) {
    return this.diaryRepository.findOne(options);
  }
}
