import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Studio } from '../studios.entity';
import { SearchStudioDto } from '../dto/search-studio.dto';

@Injectable()
export class SearchStudio {
  constructor(@InjectRepository(Studio) private studioRepository: Repository<Studio>) {}

  public find = async (searchCharacterDto: SearchStudioDto): Promise<Studio[]> => {
    const { name } = searchCharacterDto;
    const updateQuery = this.studioRepository.createQueryBuilder('studio');

    if (name) updateQuery.where('studio.name = :name', { name: name });

    return updateQuery.getMany();
  };
}
