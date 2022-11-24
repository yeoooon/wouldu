import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30, unique: true })
  email: string;

  @Column({ length: 10, unique: true })
  nickname: string;

  @Column({ length: 100 })
  hashedPassword: string;

  @Column({ length: 30, default: null })
  socialId: string;

  @Column({ length: 100, default: null })
  profileImgUrl: string;

  @Column()
  signupVerifyToken: string;

  @Column()
  registerProgress: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  registeredAt: Date;
}
