import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from 'src/shared/bcrypt';

@Injectable()
export class AuthService {
  constructor(private bcrypt: Bcrypt, private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findCreditential(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
