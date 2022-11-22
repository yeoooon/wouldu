import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { EmailService } from '../email/email.service';
import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    const { email, nickname, password, socialId, profileImgUrl } =
      createUserDto;
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnprocessableEntityException('이메일 중복');
    }
    const signupVerifyToken = uuid.v1();
    user.email = email;
    user.nickname = nickname;
    user.password = await bcrypt.hash(password, 10);
    user.socialId = socialId === undefined ? null : socialId;
    user.profileImgUrl = profileImgUrl === undefined ? null : profileImgUrl;
    user.signupVerifyToken = signupVerifyToken;
    await this.userRepository.save(user);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { signupVerifyToken },
    });
    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    return this.authService.login(user.email, user.password);
  }

  async checkUserExists(emailAddress: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { email: emailAddress },
    });
    return user !== null;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
