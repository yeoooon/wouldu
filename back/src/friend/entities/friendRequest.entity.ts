import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
