import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { Repository } from 'typeorm';
import { SearchCharacterDto } from './dto/search-character.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { SearchCharacters } from './providers/search-characters';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character) private characterRepository: Repository<Character>,
    private searchCharacter: SearchCharacters,
  ) {}

  getCharacter(searchCharacterDto: SearchCharacterDto): Promise<Character[]> {
    return this.searchCharacter.find(searchCharacterDto);
  }

  getCharacters(id: number): Promise<Character[]> {
    return this.searchCharacter.find({ id });
  }

  async create(createCharacterDto: CreateCharacterDto): Promise<object> {
    const createQuery = await this.characterRepository
      .createQueryBuilder()
      .insert()
      .values(createCharacterDto)
      .execute();

    return { id: createQuery.identifiers[0].id };
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto): Promise<object> {
    await this.characterRepository
      .createQueryBuilder()
      .update()
      .where(`id = :id`, { id: id })
      .set(updateCharacterDto)
      .execute();

    return { id: id };
  }

  async delete(id: string): Promise<string> {
    await this.characterRepository
      .createQueryBuilder()
      .delete()
      .where(`id = :id`, { id: id })
      .execute();

    return 'deleted';
  }
}
