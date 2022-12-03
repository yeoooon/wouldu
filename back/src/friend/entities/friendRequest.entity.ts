import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'friend_request' })
export class FriendRequest {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fromUserId: string;

  @Column()
  toUserId: string;

  @Column()
  requestProgress: number;

  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updatedAt?: Date;
}
