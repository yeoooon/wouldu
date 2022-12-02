import { Diary } from 'src/diary/entities/diary.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn('increment')
  friendId: number;

  @PrimaryColumn()
  userId: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @Column()
  title: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
