import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { userModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { JwtRequestMiddleware } from './jwtLogger.middleware';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { validate } from './core/env.validation';
import { PokemonModule } from './pokemon/pokemon.module';
import { PrimaModule } from './prisma/prisma.module';
import { PowerModule } from './power/power.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate: validate,
    }),
    userModule,
    AuthModule,
    StoreModule,
    BookmarkModule,
    PokemonModule,
    PrimaModule,
    PowerModule,
  ],
  controllers: [],
  providers: [JwtService],
  exports: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtRequestMiddleware)
      .forRoutes({ path: '/Bookmark', method: RequestMethod.ALL });
  }
}
