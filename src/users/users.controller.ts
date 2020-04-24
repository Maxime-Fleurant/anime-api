import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOneUserOrchestration(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<object> {
    return this.userService.postUserOrchestration(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() { user }: { user: User },
  ): Promise<object> {
    return this.userService.putUserOrchestration(id, updateUserDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: number, @Req() { user }: { user: User }): Promise<string> {
    return this.userService.deleteUserOrchestration(id, user);
  }
}
