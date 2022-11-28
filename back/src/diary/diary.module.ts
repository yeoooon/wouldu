import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryDAO } from './dao/diary.dao';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { Diary } from './entities/diary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  controllers: [DiaryController],
  providers: [DiaryService, DiaryDAO],
  exports: [DiaryService],
})
export class DiaryModule {}
