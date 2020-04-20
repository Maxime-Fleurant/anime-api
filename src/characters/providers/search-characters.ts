import { Injectable } from '@nestjs/common';
import { Character } from '../character.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchCharacterDto } from '../dto/search-character.dto';

@Injectable()
export class SearchCharacters {
  constructor(@InjectRepository(Character) private characterRepository: Repository<Character>) {}

  public find = async (searchCharacterDto: SearchCharacterDto): Promise<Character[]> => {
    const { animeId, id } = searchCharacterDto;
    const searchQuery = this.characterRepository.createQueryBuilder('character');

    if (animeId) searchQuery.where(`character.animeId = :animeId`, { animeId: animeId });
    if (id) searchQuery.andWhere('character.id = :id', { id: id });

    return searchQuery.getMany();
  };
}
