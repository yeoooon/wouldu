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

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    const { email, nickname, password, socialId, profileImgUrl } =
      createUserDto;
    const emailExist = await this.checkUserExistsByEmail(email);
    if (emailExist) {
      throw new UnprocessableEntityException('이메일 중복');
    }
    const nicknameExist = await this.checkUserExistsByNickname(nickname);
    if (nicknameExist) {
      throw new UnprocessableEntityException('닉네임 중복');
    }
    const signupVerifyToken = uuid.v1();
    user.email = email;
    user.nickname = nickname;
    user.hashedPassword = await bcrypt.hash(password, 10);
    user.socialId = socialId === undefined ? null : socialId;
    user.profileImgUrl = profileImgUrl === undefined ? null : profileImgUrl;
    user.signupVerifyToken = signupVerifyToken;
    user.status = '가입 중';
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

    user.status = '가입 완료';
    await this.userRepository.save(user);

    // return this.authService.login(user.email, user.password);
    return '회원가입 완료';
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id: id },
    });
  }

  async checkUserExistsByEmail(emailAddress: string): Promise<boolean> {
    const user = this.userRepository.findOne({
      where: { email: emailAddress },
    });
    return user !== null;
  }

  async checkUserExistsByNickname(nickname: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { nickname },
    });
    return user !== null;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
