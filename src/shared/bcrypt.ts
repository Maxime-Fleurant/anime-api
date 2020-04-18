import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  public hash = bcrypt.hash;
  public compare = bcrypt.compare;
}
