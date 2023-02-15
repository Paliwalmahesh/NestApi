import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { userModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { LoggerMiddleware } from './logger.middleware';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [userModule, AuthModule, StoreModule, BookmarkModule],
  controllers: [],
  providers: [JwtService],
  exports: [JwtService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/Bookmark', method: RequestMethod.ALL });
  }
}
