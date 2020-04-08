import { Module } from '@nestjs/common';
import { AnimesModule } from './animes/animes.module';
import { StudiosModule } from './studios/studios.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CharactersModule } from './characters/characters.module';

@Module({
  imports: [AnimesModule, StudiosModule, ReviewsModule, CharactersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
