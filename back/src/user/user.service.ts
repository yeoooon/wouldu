import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    const { email, nickname, password, socialId, profileImgUrl } =
      createUserDto;
    // const userExist = await this.checkUserExists(email);
    // if (userExist) {
    //   throw new UnprocessableEntityException('이메일 중복');
    // }
    user.email = email;
    user.nickname = nickname;
    user.password = password;
    user.socialId = socialId === undefined ? null : socialId;
    user.profileImgUrl = profileImgUrl === undefined ? null : profileImgUrl;
    await this.userRepository.save(user);
  }

  // async checkUserExists(emailAddress: string): Promise<boolean> {
  //   const user = await this.userRepository.findOne({ email : emailAddress } });
  //   return user !== undefined;
  // }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  findOne(id: number): string {
    // findOne(id: number): Promise<User> {
    // return this.userRepository.findOneBy({ id });
    return 'findOne';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
