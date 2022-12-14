import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from 'src/diary/entities/diary.entity';
import { Planner } from 'src/planner/entities/planner.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(Diary)
    private diaryRepository: Repository<Diary>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Planner)
    private plannerRepository: Repository<Planner>,
  ) {}
  async getActivity() {
    const now = new Date();
    const today =
      now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    const todayDiaries = await this.diaryRepository.find({
      where: { date: today },
    });

    todayDiaries.forEach(async (element) => {
      const user = await this.userRepository.findOne({
        where: { id: element.userId },
      });
      const category = user.survey.split(',');
      category.push('공통');
      const data = await this.activityRepository
        .createQueryBuilder('activity')
        .select(['activity.activity'])
        .where('activity.category IN (:category)', { category })
        .orderBy('RAND()')
        .limit(1)
        .getOne();
      const tomorrow =
        now.getFullYear() +
        '-' +
        (now.getMonth() + 1) +
        '-' +
        (now.getDate() + 1);
      this.plannerRepository.save({
        description: data.activity,
        date: tomorrow,
        isRecommended: 1,
        userId: element.userId,
        prority: 1,
      });
    });
  }
}
