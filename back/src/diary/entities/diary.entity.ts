import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Diary {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  friendId: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  date: Date;
}
