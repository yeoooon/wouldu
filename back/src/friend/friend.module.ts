import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { FriendRequest } from './entities/friendRequest.entity';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([FriendRequest]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '60s',
      },
    }),
    AuthModule,
  ],
  controllers: [FriendController],
  providers: [FriendService, UserService, EmailService, AuthService],
})
export class FriendModule {}
