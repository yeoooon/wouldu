import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [FriendModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
