import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GenericServiceOrchestratorFactory } from '../shared/generic-service-orchestrator';
import { Bcrypt } from '../shared/bcrypt';

@Injectable()
export class UsersService extends GenericServiceOrchestratorFactory<User, CreateUserDto, UpdateUserDto>(User) {
  constructor(private bcrypt: Bcrypt, @InjectRepository(User) private userRepository: Repository<User>) {
    super();
  }

  async findCreditential(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder()
      .where(`email = :email`, { email: email })
      .getOne();
  }

  async findOneUserOrchestration(id: number): Promise<User> {
    const [{ password, ...user }] = await super.findOneOrchestration(id);

    return user;
  }

  async postUserOrchestration(createUserDto: CreateUserDto): Promise<object> {
    const { password, email } = createUserDto;
    const hashedPassword = await this.bcrypt.hash(password, 10);

    return super.postOrchestration({ password: hashedPassword, email });
  }

  async putUserOrchestration(id: number, updateUserDto: UpdateUserDto, user: User): Promise<object> {
    const userToUpdate = await super.findOneOrchestration(id);

    if (!userToUpdate.length || userToUpdate[0].id != user.id) throw new ForbiddenException();

    return super.putOrchestration(id, updateUserDto);
  }

  async deleteUserOrchestration(id: number, user: User): Promise<string> {
    const userToUpdate = await super.findOneOrchestration(id);

    if (!userToUpdate.length || userToUpdate[0].id != user.id) throw new ForbiddenException();

    return super.deleteOrchestration(id);
  }
}
