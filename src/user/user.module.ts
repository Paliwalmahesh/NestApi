// import { PrismaClient } from '@prisma/client';
import { Module } from '@nestjs/common';
import { user } from './user.controller';
import { UserService } from './user-service/user-service';

@Module({
  imports: [],
  controllers: [user],
  providers: [UserService],
})
export class userModule {}
