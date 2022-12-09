import {
  Column,
  CreateDateColumn,
  Entity,
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
  userId: string;

  @Column()
  content: string;

  @Column()
  date: string;

  @Column()
  emotion: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt?: Date;
}
