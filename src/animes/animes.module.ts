import { Module } from '@nestjs/common';
import { AnimesController } from './animes.controller';
import { AnimesService } from './animes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anime } from './animes.entity';
import { CreateAnimes } from './providers/create-animes';
import { UpdateAnimes } from './providers/update-animes';
import { DeleteAnimes } from './providers/delete-animes';
import { SearchAnime } from './providers/search-animes';

@Module({
  imports: [TypeOrmModule.forFeature([Anime])],
  controllers: [AnimesController],
  providers: [AnimesService, SearchAnime, CreateAnimes, UpdateAnimes, DeleteAnimes],
})
export class AnimesModule {}
