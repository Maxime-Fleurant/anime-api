import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { SearchCharacters } from './providers/search-characters';
import { CreateCharacters } from './providers/create-characters';
import { UpdateCharacters } from './providers/update-characters';
import { DeleteCharacters } from './providers/delete-characters';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  controllers: [CharactersController],
  providers: [CharactersService, SearchCharacters, CreateCharacters, UpdateCharacters, DeleteCharacters],
})
export class CharactersModule {}
