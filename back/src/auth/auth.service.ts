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
    const payload = { userUid: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      ...user,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (
      !(await bcrypt.compare(password, user?.hashedPassword ?? '')) ||
      user.registerProgress === 0
    ) {
      return null;
    }
    return user;
  }
}
