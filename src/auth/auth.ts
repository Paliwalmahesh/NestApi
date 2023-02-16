import { user } from './../user/user.controller';
import { Injectable } from '@nestjs/common';
import { authDto } from './dto/authDTO';
import { User, UserStrore } from 'src/store/user-strore/user-strore';
import { randomUUID, verify } from 'crypto';
import { JwtService } from '@nestjs/jwt/dist';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class Auth {
  constructor(
    private readonly userStore: UserStrore,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async saveuser(user_data: authDto) {
    const id = randomUUID();
    const hashedPassword = await hash(user_data.password, 10);
    const user: User = {
      id: id,
      email: user_data.email,
      password: hashedPassword,
    };

    this.userStore.save(user);
    return await this.prismaService.user.create({
      data: {
        email: user_data.email,
        password: hashedPassword,
      },
    });
  }

  async signin(authBody: authDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: authBody.email,
      },
    });
    // const user = this.userStore.getbyEmail(authBody.email);
    if (!user) {
      return 'user not exist';
    }
    if (!(await compare(authBody.password, user.password))) {
      return 'Invalid password';
    }

    const token = {
      id: user.id,
      email: authBody.email,
      password: authBody.password,
    };
    const accesskey = this.jwtService.sign(token);
    console.log(this.jwtService.decode(accesskey));
    return this.jwtService.sign(token);
  }
}
