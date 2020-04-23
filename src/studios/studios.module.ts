import { Module } from '@nestjs/common';
import { StudiosController } from './studios.controller';
import { StudiosService } from './studios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Studio } from './studios.entity';
import { SearchStudio } from './providers/search-studio';

@Module({
  imports: [TypeOrmModule.forFeature([Studio])],
  controllers: [StudiosController],
  providers: [StudiosService, SearchStudio],
})
export class StudiosModule {}
