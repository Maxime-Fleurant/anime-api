import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from 'src/shared/bcrypt';

@Injectable()
export class AuthService {
  constructor(private bcrypt: Bcrypt, private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findCreditential(email);

    if (user && (await this.bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { userId: user.id, admin: user.admin, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
