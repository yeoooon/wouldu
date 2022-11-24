import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Query,
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
    findAll(@Param("userId") userId: string) {
      return this.plannerService.findAll(userId);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.plannerService.findOne(id);
    }

    @Get("week/:userId")
    async Week(@Param("userId") id: string) {
      const data = await this.plannerService.findWeek(id)
      return data
    }

    @Get("month/:userId")
    async Month(@Param("userId") id: string, @Query("refDate") refDate: Date) {
      const data = await this.plannerService.findMonth(id, refDate)
      return data
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdatePlannerDto) {
      return this.plannerService.updatePlan(id, updateUserDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.plannerService.deletePlan(id);
    }

    @Patch(":id")
    changCompletionStatus(@Param('id') id: string) {
      return this.plannerService.changeCompletionStatus(id)
    }

    @Patch("priority/:id")
    changPriority(@Param('id') id: string, @Query("priority") priority: number) {
      return this.plannerService.changePriority(id, priority)
    }
  }