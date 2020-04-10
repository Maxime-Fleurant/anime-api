import { Module } from '@nestjs/common';
import { AnimesController } from './animes.controller';
import { AnimesService } from './animes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anime } from './animes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Anime])],
  controllers: [AnimesController],
  providers: [AnimesService],
})
export class AnimesModule {}
