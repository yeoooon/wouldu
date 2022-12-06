import {
  HttpException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateNicknameDto } from './dto/update-nickname.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { EmailService } from '../email/email.service';
import { AuthService } from 'src/auth/auth.service';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { UpdateSurveyDTO } from './dto/update-survey.dto';

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
    const emailExist = await this.checkUserExistsByEmail(email);
    if (emailExist) {
      throw new UnprocessableEntityException('이메일 중복');
    }
    const nicknameExist = await this.checkUserExistsByNickname(nickname);
    if (nicknameExist) {
      throw new UnprocessableEntityException('닉네임 중복');
    }
    const signupVerifyToken = uuid.v4();
    user.email = email;
    user.nickname = nickname;
    user.hashedPassword = await bcrypt.hash(password, 10);
    user.socialId = socialId ?? null;
    user.profileImgUrl = profileImgUrl ?? null;
    user.signupVerifyToken = signupVerifyToken;
    user.registerProgress = 0;
    user.friendCode = await this.makeFriendCode();
    await this.userRepository.save(user);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  async makeFriendCode(): Promise<string> {
    var code = Math.random().toString(36).substring(2, 8);
    while (true) {
      const isCodeExist = await this.findOneByCode(code);
      if (isCodeExist !== undefined) break;
      code = Math.random().toString(36).substring(2, 8);
    }
    return code;
  }

  async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  async verifyEmail(signupVerifyToken: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { signupVerifyToken },
    });

    if (!user) {
      throw new NotFoundException('유저가 존재하지 않습니다.');
    }

    user.registerProgress = 1;
    await this.userRepository.save(user);

    return this.authService.login(user);
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id: id },
    });
  }

  async findOneByCode(code: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { friendCode: code },
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async checkUserExistsByEmail(emailAddress: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
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

  userData(user: User) {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      socialId: user.socialId,
      registerProgress: user.registerProgress,
      registeredAt: user.registeredAt,
      friendCode: user.friendCode,
      survey: user.survey !== null ? this.stringToArray(user.survey) : null,
    };
  }

  async findAll() {
    const users = await this.userRepository.find();
    const userList = [];
    for (const user of users) {
      const item = this.userData(user);
      userList.push(item);
    }
    return userList;
  }

  async findUser(id: string) {
    const user = await this.findOneById(id);
    return this.userData(user);
  }

  arrayToString(array: String[]) {
    return array.toString();
  }

  stringToArray(string: String) {
    return string.split(',');
  }

  async updateNickname(id: string, updateNicknameDto: UpdateNicknameDto) {
    const { nickname } = updateNicknameDto;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (nickname !== undefined) {
      const nicknameExist = await this.checkUserExistsByNickname(nickname);
      if (nicknameExist) {
        throw new UnprocessableEntityException('닉네임 중복');
      }
      user.nickname = nickname;
    }

    await this.userRepository.save(user);
    return `닉네임 수정 완료`;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDTO) {
    const { password } = updatePasswordDto;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (password !== undefined) {
      user.hashedPassword = await bcrypt.hash(password, 10);
    }

    await this.userRepository.save(user);
    return `비밀번호 수정 완료`;
  }

  async updateSurvey(id: string, updateSurveyDTO: UpdateSurveyDTO) {
    const { survey } = updateSurveyDTO;
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (survey !== undefined) {
      user.survey = this.arrayToString(survey);
    }

    await this.userRepository.save(user);
    return `설문조사 수정 완료`;
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async newPassword(email: string) {
    const user = await this.findOneByEmail(email);
    if (user === undefined) {
      throw new HttpException('해당 이메일의 유저가 존재하지 않습니다.', 404);
    }
    const newPassword = Math.random().toString(36).substring(2, 10);
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.hashedPassword = newHashedPassword;
    await this.userRepository.save(user);
    await this.emailService.sendNewPassword(user.email, newPassword);
    return '비밀번호 찾기 완료';
  }
}
