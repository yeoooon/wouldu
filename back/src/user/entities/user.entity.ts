import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 30, unique: true })
  email: string;

  @Column({ length: 10 })
  nickname: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 30, default: null })
  socialId: string;

  @Column({ length: 100, default: null })
  profileImgUrl: string;

  @Column()
  signupVerifyToken: string;
}
