import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = { userId: user.id, admin: user.admin, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
