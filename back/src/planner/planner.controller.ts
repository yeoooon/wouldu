import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  Req,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { PlannerService } from './planner.service';

@Controller('planner')
@ApiTags('플래너 API')
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  @Post()
  @ApiOperation({
    summary: '계획 생성 API',
    description: 'description, date를 입력하여 계획을 생성',
  })
  create(@Req() request: Request, @Body() createPlannerDto: CreatePlannerDto) {
    const userId = request['currentUserId'];
    return this.plannerService.createPlan(userId, createPlannerDto);
  }

  @Get()
  @ApiOperation({
    summary: '날짜별 일정 API',
    description:
      'param에 yyyy-yy-dd 형식으로 날짜를 넣으면 해당하는 계획을 모두 불러옴',
  })
  findAll(@Req() request: Request, @Query('date') date: Date) {
    const userId = request['currentUserId'];
    return this.plannerService.findAllByDate(userId, date);
  }

  @Get(':id')
  @ApiOperation({
    summary: '단일 일정 API',
    description: 'plan의 id를 param으로 해당 일정을 불러옴',
  })
  findOne(@Param('id') id: number) {
    return this.plannerService.findOne(id);
  }

  @Get('check')
  @ApiOperation({
    summary: '일정 유무 확인 API',
    description:
      'param으로 date를 넣으면 해당 날짜에 일정이 있었는지(1) 없었는지(0) 알려줌(수정요망)',
  })
  checkIfThereIsPlanOrNot(@Query('date') date: Date) {
    return this.plannerService.checkIfThereIsPlanOrNot(date);
  }

  @Put(':id')
  @ApiOperation({
    summary: '계획 수정 API',
    description:
      'param으로 plan id를 받아 계획을 수정, 3가지 모두 넣을 필요 없음',
  })
  @ApiBody({
    description: `{
      "description":"설명",
      "date":"yyyy-mm-dd",
      "priority":"우선순위"
      }`,
  })
  update(@Param('id') id: number, @Body() updateUserDto: UpdatePlannerDto) {
    return this.plannerService.updatePlan(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '계획 삭제 API',
    description: 'param으로 plan id를 받아 계획을 삭제',
  })
  remove(@Param('id') id: number) {
    return this.plannerService.deletePlan(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '계획 완료상태 수정 API',
    description: '계획 완료 상태를 수정해줌',
  })
  changCompletionStatus(@Param('id') id: number) {
    return this.plannerService.changeCompletionStatus(id);
  }

  @Patch(':id/priority')
  @ApiOperation({
    summary: '우선순위 수정 API',
    description: 'plan id를 param으로 우선순위를 query로 받아 우선순위 수정',
  })
  changPriority(@Param('id') id: number, @Query('priority') priority: number) {
    return this.plannerService.changePriority(id, priority);
  }
}
