import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { SearchCharacters } from './providers/search-characters';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  controllers: [CharactersController],
  providers: [CharactersService, SearchCharacters],
})
export class CharactersModule {}
