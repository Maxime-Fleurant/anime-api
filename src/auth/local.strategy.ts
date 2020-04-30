import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Bcrypt } from '../shared/bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService, private bcrypt: Bcrypt) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.userService.findCreditential(email);

    if (user && (await this.bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;

      return result;
    }

    throw new UnauthorizedException();
  }
}
