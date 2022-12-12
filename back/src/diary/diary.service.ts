import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FriendService } from 'src/friend/friend.service';
import { groupBy } from 'src/util/groupBy';
import { DiaryDAO } from './dao/diary.dao';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { DiaryDateDto } from './dto/diary-date.dto';
import { Diary } from './entities/diary.entity';

@Injectable()
export class DiaryService {
  constructor(
    private readonly diaryDAO: DiaryDAO,
    private readonly friendService: FriendService,
    private readonly httpService: HttpService,
  ) {}

  async create(currentUserId: string, createDiaryDto: CreateDiaryDto) {
    const diary = new Diary();
    const { content } = createDiaryDto;

    const emotion = await this.httpService.axiosRef.get(
      'http://kdt-ai5-team05.elicecoding.com:3000/?sentence=' + content,
    );

    diary.friendId = await this.friendService.findFriendId(currentUserId);
    diary.userId = currentUserId;
    diary.content = content;
    diary.emotion = emotion.data;

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
    const friend = await this.friendService.findFriend(currentUserId);
    const friendId = friend.friendId;
    const title = friend.title;
    if (friendId === null) {
      return {
        message: '맺은 친구가 없습니다.',
      };
    }
    const diaries = await this.diaryDAO.getMany('diary.friendId=:friendId', {
      friendId,
    });
    if (diaries.length === 0) {
      return {
        message: '다이어리 작성 내역이 없습니다.',
      };
    }
    return {
      title: title,
      diaries: diaries,
    };
  }

  async findDiaryByDate(currentUserId: string, date: string) {
    const friend = await this.friendService.findFriend(currentUserId);
    const friendId = friend.friendId;
    const title = friend.title;
    if (friendId === null) {
      return {
        message: '맺은 친구가 없습니다.',
      };
    }
    const diaries = await this.diaryDAO.getMany(
      'diary.friendId=:friendId and date=:date',
      {
        friendId: friendId,
        date: date,
      },
    );
    return {
      title: title,
      diaries: diaries,
    };
  }

  async findDiaryByMonth(currentUserId: string, monthString: string) {
    const friend = await this.friendService.findFriend(currentUserId);
    const friendId = friend.friendId;
    const title = friend.title;
    if (friendId === null) {
      return {
        message: '맺은 친구가 없습니다.',
      };
    }
    const diaries = await this.diaryDAO.getMany(
      'diary.friendId=:friendId and date like :date',
      {
        friendId: friendId,
        date: monthString + '%',
      },
    );

    return {
      title: title,
      diaries: groupBy(diaries, (item) => {
        return item.date;
      }),
    };
  }

  async collectEmotions(userId: string | null, diaryDateDto: DiaryDateDto) {
    return this.diaryDAO.getEmotions(userId, diaryDateDto);
  }
}
