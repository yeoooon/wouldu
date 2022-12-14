import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivityService } from './activity.service';

@Controller('activity')
@ApiTags('활동추천 API')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}
  @Post()
  async getActivity() {
    return this.activityService.getActivity();
  }
}
