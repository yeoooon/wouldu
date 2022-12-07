import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendService } from 'src/friend/friend.service';
import { HttpService } from '@nestjs/axios';
import { Like } from 'typeorm';
import { DiaryDAO } from './dao/diary.dao';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { Diary } from './entities/diary.entity';
import { Observable } from 'rxjs';

@Injectable()
export class DiaryService {
  constructor(
    private readonly diaryDAO: DiaryDAO,
    private readonly friendService: FriendService,
    private readonly httpService: HttpService,
  ) {}

  async model(sentence: string) {
    const emotion = await this.httpService.axiosRef.get(
      'http://kdt-ai5-team05.elicecoding.com:3000/?sentence=' + sentence,
    );

    return emotion.data;
  }

  async create(currentUserId: string, createDiaryDto: CreateDiaryDto) {
    const diary = new Diary();
    const { content } = createDiaryDto;
    diary.friendId = await this.friendService.findFriendId(currentUserId);
    diary.authorId = currentUserId;
    diary.content = content;

    const emotion = await this.httpService.axiosRef.get(
      'http://kdt-ai5-team05.elicecoding.com:3000/?sentence=' + content,
    );

    const dt = new Date();
    diary.date =
      dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();

    const isDiaryExist = await this.checkDiary(currentUserId, diary.date);
    if (isDiaryExist) {
      throw new BadRequestException('오늘 일기를 이미 작성했습니다.');
    }

    return this.diaryDAO.createOne(diary), emotion.data;
  }

  async checkDiary(currentUserId: string, date: string) {
    const diary = await this.diaryDAO.getMany({
      where: {
        authorId: currentUserId,
        date: date,
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
