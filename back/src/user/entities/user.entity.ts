import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 30 })
  email: string;

  @Column({ length: 10 })
  nickname: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 30, default: null })
  socialId: string;

  @Column({ length: 100, default: null })
  profileImgUrl: string;
}
