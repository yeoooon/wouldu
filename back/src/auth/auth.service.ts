import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(user: User) {
    const payload = { userId: user.id };
    const isFirstLogin = user.registerProgress - 1;
    if (user.registerProgress === 1) {
      user.registerProgress = 2;
      await this.userRepository.save(user);
    }
    return {
      accessToken: this.jwtService.sign(payload),
      ...user,
      isFirstLogin,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    const isPasswordMatched = await bcrypt.compare(
      password,
      user?.hashedPassword ?? '',
    );
    if (!isPasswordMatched || user.registerProgress === 0) {
      return null;
    }

    return user;
  }
}
