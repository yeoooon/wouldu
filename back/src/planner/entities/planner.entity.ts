import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Planner {
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @Column()
  priority: number;
}
