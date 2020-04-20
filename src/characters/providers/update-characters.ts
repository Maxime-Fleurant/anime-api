import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from '../character.entity';
import { Repository } from 'typeorm';
import { UpdateCharacterDto } from '../dto/update-character.dto';

export interface UpdateCharacterParams {
  id: number;
  updateData: UpdateCharacterDto;
}

@Injectable()
export class UpdateCharacters {
  constructor(@InjectRepository(Character) private characterRepository: Repository<Character>) {}

  update = async (updateCharacterParams: UpdateCharacterParams): Promise<object> => {
    const { id, updateData } = updateCharacterParams;

    await this.characterRepository
      .createQueryBuilder()
      .update()
      .where(`id = :id`, { id: id })
      .set(updateData)
      .execute();

    return { id: id };
  };
}
