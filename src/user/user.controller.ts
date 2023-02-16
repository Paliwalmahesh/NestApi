import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard/jwt.auth.guard';
import { JwtStrategy } from 'src/auth/jwt-auth-strategy/jwt.auth.strategy';
import { UserService } from './user-service/user-service';

@Controller('/user')
@UseGuards(JwtAuthGuard)
export class user {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): any {
    return this.userService.getall();
  }
}
