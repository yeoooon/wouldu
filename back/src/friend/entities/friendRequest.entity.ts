import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class FriendRequest {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  fromUserId: string;

  @Column()
  toUserId: string;
}
