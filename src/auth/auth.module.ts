import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { Auth } from './auth';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from './jwt-auth-strategy/jwt.auth.strategy';
import { JwtAuthGuard } from './jwt-auth-guard/jwt.auth.guard';

@Module({
  controllers: [AuthController],
  providers: [Auth, JwtAuthGuard, JwtStrategy],
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: '60mins',
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
