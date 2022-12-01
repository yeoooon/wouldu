import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Diary {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  friendId: number;

  @Column()
  authorId: string;

  @Column()
  content: string;

  @Column()
  date: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.diaries)
  user: User;
}
