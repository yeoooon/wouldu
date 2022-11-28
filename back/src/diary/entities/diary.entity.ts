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
  authorId: string;

  @Column()
  content: string;

  @Column()
  date: Date;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt?: Date;
}
