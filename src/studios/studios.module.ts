import { Module } from '@nestjs/common';
import { StudiosController } from './studios.controller';
import { StudiosService } from './studios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studio } from './studios.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Studio])],
  controllers: [StudiosController],
  providers: [StudiosService],
})
export class StudiosModule {}
