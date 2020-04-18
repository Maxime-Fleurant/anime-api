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
import { Review } from './reviews/reviews.entity';
import { Character } from './characters/character.entity';
import { ExternalLink } from './external-links/external-links.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'anidb',
      password: 'test123',
      database: 'anidb',
      entities: [Studio, Theme, Genre, Tag, Anime, Review, Character, ExternalLink, User],
      synchronize: true,
    }),
    AnimesModule,
    StudiosModule,
    ReviewsModule,
    CharactersModule,
    ExternalLinksModule,
    TagsModule,
    AuthModule,
    UsersModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
