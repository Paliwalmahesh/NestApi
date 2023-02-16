import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IRequest, AuthUser } from './type';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class JwtRequestMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: IRequest, res: Response, next: NextFunction) {
    console.log(req.headers);
    const header = req.headers['authorization'];
    console.log(header);
    if (!header) {
      res.status(402).send('Access denied');
    }
    try {
      const decode: any = this.jwtService.decode(header.toString());
      const usercheck = decode as AuthUser;
      console.log('my code ' + usercheck.id);
      req.userData = usercheck;
    } catch (e) {
      res.send('Error');
    }

    next();
  }
}
