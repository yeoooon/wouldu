import {
    Entity,
    Column,
    PrimaryGeneratedColumn
  } from 'typeorm';
  
  @Entity()
  export class Planner {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 100 })
    description: string;
  
    @Column({ type: 'date' })
    date: Date;
  
    @Column({ default: 0 })
    isRecommended: number;

    @Column({ default: 0 })
    isCompleted: number;
  
    @Column({ length: 100, default: null })
    imgUrl: string;
  
    @Column({ length: 50 })
    userId: string;
  
    @Column({
      type: 'timestamp',
      nullable: false,
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;
  
    @Column()
    priority: number;
  }
  