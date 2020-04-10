import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimesModule } from './animes/animes.module';
import { StudiosModule } from './studios/studios.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CharactersModule } from './characters/characters.module';
import { Studio } from './studios/studios.entity';
import { Theme } from './themes/themes.entity';
import { Tag } from './tags/tags.entity';
import { Genre } from './genres/genres.entity';
import { ExternalLinksModule } from './external-links/external-links.module';
import { TagsModule } from './tags/tags.module';
import { Anime } from './animes/animes.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'anidb',
      password: 'test123',
      database: 'anidb',
      entities: [Studio, Theme, Genre, Tag, Anime],
      synchronize: true,
    }),
    AnimesModule,
    StudiosModule,
    ReviewsModule,
    CharactersModule,
    ExternalLinksModule,
    TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
