import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlannerService } from './planner.service';
import { PlannerController } from './planner.controller';
import { Planner } from './entities/planner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Planner])],
  controllers: [PlannerController],
  providers: [PlannerService],
  exports: [TypeOrmModule],
})
export class PlannerModule {}
