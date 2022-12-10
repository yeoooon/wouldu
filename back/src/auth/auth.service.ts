import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private httpService: HttpService,
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
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      friendCode: user.friendCode,
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

  async kakao(code: string) {
    const kakao_api_url = `https://kauth.kakao.com/oauth/token
    ?grant_type=authorization_code
    &client_id=${process.env.KAKAO_CLIENT_ID}
    &redirect_url=${process.env.KAKAO_REDIRECT_URL}
    &code=${code}`;
    console.log(kakao_api_url);

    const token_res = await firstValueFrom(
      this.httpService.post(kakao_api_url),
    );
    console.log(token_res);
    const accessToken: string = token_res.data.access_token;
    console.log(accessToken);
    // const userInfo = await firstValueFrom(
    //   this.httpService.get('https://kapi.kakao.com/v2/user/me', {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //   }),
    // );
    // console.log(userInfo);
    // const userId: string = userInfo.data.id;
    // console.log(userId);
  }
}
