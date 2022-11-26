import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
  } from 'typeorm';
  
  @Entity()
  export class Planner {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ length: 100 })
    description: string;
  
    @Column({ type : 'date', nullable: false })
    date: Date;
  
    @Column({ default: 0 })
    isRecommended: number;

    @Column({ default: 0 })
    isCompleted: number;
  
    @Column({ length: 100, default: null })
    imgUrl: string;
  
    @ManyToOne(() => User, (user) => user.planners)
    user: User;
  
    @Column({
      type: 'timestamp',
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
  
    @Column()
    priority: number;
  }
  