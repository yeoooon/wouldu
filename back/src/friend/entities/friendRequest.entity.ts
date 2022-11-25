import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fromUserId: string;

  @Column()
  toUserId: string;

  @Column()
  requestProgress: number;
}
