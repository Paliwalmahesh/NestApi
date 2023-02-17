import { PrismaService } from './../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard/jwt.auth.guard';
import { JwtStrategy } from 'src/auth/jwt-auth-strategy/jwt.auth.strategy';
import { UserService } from './user-service/user-service';

@Controller('/user')
export class user {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): any {
    return this.prismaService.user.findMany();
  }
}
