import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Bcrypt } from 'src/shared/bcrypt';

@Injectable()
export class UsersService {
  constructor(private bcrypt: Bcrypt, @InjectRepository(User) private userRepository: Repository<User>) {}

  async findOne(id: number): Promise<User> {
    const { password, ...user } = await this.userRepository
      .createQueryBuilder()
      .where(`id = :id`, { id: id })
      .getOne();

    return user;
  }

  async findCreditential(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .where(`email = :email`, { email: email })
      .getOne();
  }

  async create(createUserDto: CreateUserDto): Promise<object> {
    const { password, email } = createUserDto;
    const hashedPassword = await this.bcrypt.hash(password, 10);

    const createQuery = await this.userRepository
      .createQueryBuilder()
      .insert()
      .values({ password: hashedPassword, email })
      .execute();

    return { id: createQuery.identifiers[0].id };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<object> {
    await this.userRepository
      .createQueryBuilder()
      .update()
      .set(updateUserDto)
      .where(`id = :id`, { id: id })
      .execute();

    return { id: id };
  }

  async delete(id: number): Promise<string> {
    await this.userRepository
      .createQueryBuilder()
      .delete()
      .where(`id = :id`, { id: id })
      .execute();

    return 'deleted';
  }
}
