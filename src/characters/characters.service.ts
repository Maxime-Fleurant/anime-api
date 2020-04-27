import { Injectable } from '@nestjs/common';
import { Character } from './character.entity';
import { SearchCharacterDto } from './dto/search-character.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { SearchCharacters } from './providers/search-characters';
import { GenericServiceOrchestratorFactory } from '../shared/generic-service-orchestrator';

@Injectable()
export class CharactersService extends GenericServiceOrchestratorFactory<
  Character,
  CreateCharacterDto,
  UpdateCharacterDto
>(Character) {
  constructor(private searchCharacterProvider: SearchCharacters) {
    super();
  }

  getCharacters(searchCharacterDto: SearchCharacterDto): Promise<Character[]> {
    return this.searchCharacterProvider.find(searchCharacterDto);
  }
}
