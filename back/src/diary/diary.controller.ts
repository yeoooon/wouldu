import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';

@Controller('diary')
@ApiTags('교환일기 API')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  @ApiOperation({
    summary: '교환일기 작성 API',
    description:
      'friendId, title, content, date를 입력하여 새 교환일기를 생성한다.',
  })
  create(@Body() createDiaryDto: CreateDiaryDto) {
    return this.diaryService.create(createDiaryDto);
  }
}
