import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { Request } from 'express';

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
    description: '교환일기 목록을 조회한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  findDiaryList(@Req() request: Request) {
    return this.diaryService.findDiaryList(request.user['userId']);
  }

  @Get('/:date')
  @ApiOperation({
    summary: '날짜로 교환일기 조회 API',
    description: '날짜를 입력하여 그 날 작성된 교환일기를 조회한다.',
  })
  @UseGuards(AuthGuard('jwt'))
  findDiaryByDate(@Req() request: Request, @Query('date') date: string) {
    return this.diaryService.findDiaryByDate(request.user['userId'], date);
  }
}
