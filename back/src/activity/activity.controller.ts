import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivityService } from './activity.service';

@Controller('activity')
@ApiTags('활동추천 API')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}
  @Get()
  async getActivity() {
    return this.activityService.getActivity();
  }
}
