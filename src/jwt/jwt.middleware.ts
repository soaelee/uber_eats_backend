import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decoded = this.jwtService.verify(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
        try {
          const user = await this.userService.findById(decoded['id']);
          req['user'] = user;
        } catch (e) {
          console.log(e);
        }
      }
    }
    next();
  }
}

// export class JwtMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(req.headers);
//     next();
//   }
// }
// 펜션: 백(nest js), 프론트 (ui: react+typescript) - graphql, apollo
