import { Injectable } from '@nestjs/common';
import { Character } from './character.entity';
import { SearchCharacterDto } from './dto/search-character.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { SearchCharacters } from './providers/search-characters';
import { CreateCharacters } from './providers/create-characters';
import { UpdateCharacters } from './providers/update-characters';
import { DeleteCharacters } from './providers/delete-characters';

@Injectable()
export class CharactersService {
  constructor(
    private searchCharacterProvider: SearchCharacters,
    private createCharacterProvider: CreateCharacters,
    private updateCharacterProvider: UpdateCharacters,
    private deleteCharacterProvider: DeleteCharacters,
  ) {}

  getCharacters(searchCharacterDto: SearchCharacterDto): Promise<Character[]> {
    return this.searchCharacterProvider.find(searchCharacterDto);
  }

  getCharacter(id: number): Promise<Character[]> {
    return this.searchCharacterProvider.find({ id });
  }

  async create(createCharacterDto: CreateCharacterDto): Promise<object> {
    return this.createCharacterProvider.create(createCharacterDto);
  }

  async update(id: number, updateCharacterDto: UpdateCharacterDto): Promise<object> {
    return this.updateCharacterProvider.update({ id, updateData: updateCharacterDto });
  }

  async delete(id: string): Promise<string> {
    return this.deleteCharacterProvider.delete(id);
  }
}
