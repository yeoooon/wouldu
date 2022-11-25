import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginRequiredMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService, private jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"]?.split(" ")[1] ?? "wrong";
    
    if (token === "wrong") {
      throw new Error("wrong token");
    }

    const jwtDecoded = this.jwtService.verify(token)
    req['currentUserId'] = jwtDecoded.userId;
    next();
  }
}
