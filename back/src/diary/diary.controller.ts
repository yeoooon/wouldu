import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { Request, Response } from 'express';
import { ReadDiaryDto } from './dto/read-diary.dto';

@Controller('diary')
@ApiTags('교환일기 API')
@ApiBearerAuth('access-token')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post()
  @ApiOperation({
    summary: '교환일기 작성 API',
    description: 'content를 입력하여 새 교환일기를 생성한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  create(@Req() request: Request, @Body() createDiaryDto: CreateDiaryDto) {
    return this.diaryService.create(request.user['userId'], createDiaryDto);
  }

  @Get()
  @ApiOperation({
    summary: '교환일기 목록 조회 API',
    description:
      '교환일기 목록을 조회한다. period에 아무 것도 입력하지 않으면 전체 조회, daily를 입력하면 일별 조회, monthly를 입력하면 월별 조회',
  })
  @UseGuards(AuthGuard('jwt'))
  async findDiaryList(
    @Req() request: Request,
    @Query() readDiaryDTO: ReadDiaryDto,
    @Res() response: Response,
  ) {
    const { period, date, month } = readDiaryDTO;
    if (period === 'daily') {
      return this.diaryService.findDiaryByDate(request.user['userId'], date);
    } else if (period === 'monthly') {
      return this.diaryService.findDiaryByMonth(request.user['userId'], month);
    } else {
      const diaryList = await this.diaryService.findDiaryList(
        request.user['userId'],
      );
      if (diaryList === null) {
        return response.status(204).send();
      }
      return response.status(200).send(diaryList);
    }
  }
}
