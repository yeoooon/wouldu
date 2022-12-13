import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}
  async getActivity(): Promise<Activity> {
    const data = this.activityRepository
      .createQueryBuilder('activity')
      .select(['activity.activity'])
      .orderBy('RAND()')
      .limit(1)
      .getOne();
    return data;
  }
}
