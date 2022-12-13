import { Entity, Column } from 'typeorm';

@Entity()
export class Activity {
  @Column()
  category: string;

  @Column()
  activity: string;
}
