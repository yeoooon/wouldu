import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
  import { Repository } from 'typeorm';
import { CreatePlannerDto } from './dto/create-planner.dto';
import { UpdatePlannerDto } from './dto/update-planner.dto';
import { Planner } from './entities/planner.entity';
  
  @Injectable()
  export class PlannerService {
    constructor(
      @InjectRepository(Planner)
      private plannerRepository: Repository<Planner>,
    ) {}
  
    async createPlan(createPlannerDto: CreatePlannerDto) {
      const planner = new Planner();
      const { description, date, imgUrl, userId, priority } =
        createPlannerDto;
      
      planner.description = description;
      planner.date = date;
      planner.imgUrl = imgUrl === undefined ? null : imgUrl;
      planner.userId = userId;
      planner.priority = priority;
      await this.plannerRepository.save(planner);
    }  

    async recommendPlan(createPlannerDto: CreatePlannerDto) {
      const planner = new Planner();
      const { description, date, imgUrl, userId } =
        createPlannerDto;
      
      planner.description = description;
      planner.date = date;
      planner.imgUrl = imgUrl === undefined ? null : imgUrl;
      planner.isRecommended = 1;
      planner.userId = userId;
      planner.priority = 1;
      await this.plannerRepository.save(planner);
    }  

    async changeCompletionStatus(id: number) {
      const planner = await this.findOne(id);
      planner.isCompleted = planner.isCompleted? 0 : 1;
      await this.plannerRepository.save(planner);
    }

    async changePriority(id: number, priority: number) {
      const planner = await this.findOne(id);
      planner.priority = priority;
      
      await this.plannerRepository.save(planner);
    }
  
    async updatePlan(id: number, updateplannerDto: UpdatePlannerDto) {
      const planner = await this.findOne(id);
      const { description, date, imgUrl } =
        updateplannerDto;
      planner.description = description;
      planner.date = date;
      planner.imgUrl = imgUrl;
      await this.plannerRepository.save(planner);
    }
  
    async deletePlan(id: number): Promise<void> {
      await this.plannerRepository.delete(id);
    }

    findAllByDate(userId: string, date: Date): Promise<Planner[]> {
      return this.plannerRepository.find({
        where : {userId, date}
    });
    }

    findOne(id: number): Promise<Planner> {
      return this.plannerRepository.findOne({
        where : {id}
    });
    }

    async checkIfThereIsPlanOrNot(date: Date) {
      const plans = await this.plannerRepository.find({
        where : {date}
      });
      if (plans.length === 1) {
        return 0
      } else {
        return 1
      }
    }
  }
  