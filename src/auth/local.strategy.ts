import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Bcrypt } from 'src/shared/bcrypt';

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
