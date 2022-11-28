import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
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

  async createPlan(userId: User, createPlannerDto: CreatePlannerDto) {
    const planner = new Planner();
    const { description, date, imgUrl, priority } = createPlannerDto;

    planner.description = description;
    planner.date = date;
    planner.imgUrl = imgUrl === undefined ? null : imgUrl;
    planner.user = userId;
    planner.priority = priority;
    await this.plannerRepository.save(planner);
  }

  // 현재는 연결된 api가 없어서 userId 생성을 못하니 이거 해결하고 풀기
  // async recommendPlan(createPlannerDto: CreatePlannerDto) {
  //   const planner = new Planner();
  //   const { description, date, imgUrl } =
  //     createPlannerDto;

  //   planner.description = description;
  //   planner.date = date;
  //   planner.imgUrl = imgUrl === undefined ? null : imgUrl;
  //   planner.isRecommended = 1;
  //   planner.userId = userId;
  //   planner.priority = 1;
  //   await this.plannerRepository.save(planner);
  // }

  async changeCompletionStatus(id: number) {
    const planner = await this.findOne(id);
    planner.isCompleted = planner.isCompleted ? 0 : 1;
    await this.plannerRepository.save(planner);
  }

  async changePriority(id: number, priority: number) {
    const planner = await this.findOne(id);
    planner.priority = priority;

    await this.plannerRepository.save(planner);
  }

  async updatePlan(id: number, updateplannerDto: UpdatePlannerDto) {
    const planner = await this.findOne(id);
    const { description, date, imgUrl } = updateplannerDto;
    planner.description = description;
    planner.date = date;
    planner.imgUrl = imgUrl;
    await this.plannerRepository.save(planner);
  }

  async deletePlan(id: number): Promise<void> {
    await this.plannerRepository.delete(id);
  }

  findAllByDate(user: User, date: Date): Promise<Planner[]> {
    console.log(date);
    return this.plannerRepository.find({
      where: { user, date },
    });
  }

  findOne(id: number): Promise<Planner> {
    return this.plannerRepository.findOne({
      where: { id },
    });
  }

  async checkIfThereIsPlanOrNot(date: Date) {
    const plans = await this.plannerRepository.find({
      where: { date, isRecommended: 0 },
    });
    if (plans.length === 0) {
      return 0;
    } else {
      return 1;
    }
  }
}
