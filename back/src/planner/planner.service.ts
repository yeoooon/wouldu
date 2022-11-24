import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Between, Repository } from 'typeorm';
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

    async changeCompletionStatus(id: string) {
      const planner = await this.findOne(id);
      planner.isCompleted = planner.isCompleted? 0 : 1;
      await this.plannerRepository.save(planner);
    }

    async changePriority(id: string, priority: number) {
      const planner = await this.findOne(id);
      planner.priority = priority;
      
      await this.plannerRepository.save(planner);
    }
  
    async updatePlan(id: string, updateplannerDto: UpdatePlannerDto) {
      const planner = await this.findOne(id);
      const { description, date, imgUrl } =
        updateplannerDto;
      planner.description = description;
      planner.date = date;
      planner.imgUrl = imgUrl;
      await this.plannerRepository.save(planner);
    }
  
    async deletePlan(id: string): Promise<void> {
      await this.plannerRepository.delete(id);
    }

    findAll(userId: string): Promise<Planner[]> {
      return this.plannerRepository.find({
        where : {userId}
    });
    }

    findOne(id: string): Promise<Planner> {
      return this.plannerRepository.findOne({
        where : {id}
    });
    }
    
    // 보류
    findWeek(id: string): Promise<Planner[]> {
      return this.plannerRepository.find({
        where : {id}
      });
    }

    findMonth(id: string, refDate: Date): Promise<Planner[]> {
      console.log(refDate)
      return this.plannerRepository.find({
        where: {
          date: Between(
              new Date(2022, 11, 20), 
              new Date(2022, 12, 26)
          ),
      }
      });
    }
  }
  