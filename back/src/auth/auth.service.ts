import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login({ email, password }) {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!(await bcrypt.compare(password, user?.hashedPassword ?? ''))) {
      return null;
    }
    return user;
  }
}
