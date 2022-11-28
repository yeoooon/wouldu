import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fromUserId: string;

  @Column()
  toUserId: string;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;
}
