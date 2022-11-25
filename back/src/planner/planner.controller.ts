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
  import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
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
      description: 'description, date를 입력하여 계획을 생성한다.',
    })
    create(@Body() createPlannerDto: CreatePlannerDto) {
      return this.plannerService.createPlan(createPlannerDto);
    }
  
    @Get(':userId')
    findAll(@Param("userId") userId: string, @Query("date") date: Date) {
      return this.plannerService.findAllByDate(userId, date);
    }
  
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.plannerService.findOne(id);
    }

    @Get('check/:date')
    checkIfThereIsPlanOrNot(@Req() request: Request, @Param('date') date: Date) {
      console.log(request['currentUserId'])
      return this.plannerService.checkIfThereIsPlanOrNot(date);
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() updateUserDto: UpdatePlannerDto) {
      return this.plannerService.updatePlan(id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.plannerService.deletePlan(id);
    }

    @Patch(":id")
    changCompletionStatus(@Param('id') id: number) {
      return this.plannerService.changeCompletionStatus(id)
    }

    @Patch("priority/:id")
    changPriority(@Param('id') id: number, @Query("priority") priority: number) {
      return this.plannerService.changePriority(id, priority)
    }
  }