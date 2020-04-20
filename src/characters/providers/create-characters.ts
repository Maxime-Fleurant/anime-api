import { Injectable } from '@nestjs/common';
import { Character } from '../character.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCharacterDto } from '../dto/create-character.dto';

@Injectable()
export class CreateCharacters {
  constructor(@InjectRepository(Character) private characterRepository: Repository<Character>) {}

  create = async (createCharacterDto: CreateCharacterDto): Promise<object> => {
    const createQuery = await this.characterRepository
      .createQueryBuilder()
      .insert()
      .values(createCharacterDto)
      .execute();

    return { id: createQuery.identifiers[0].id };
  };
}
