import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Studio } from '../studios.entity';
import { SearchStudioDto } from '../dto/search-studio.dto';

@Injectable()
export class SearchStudio {
  constructor(@InjectRepository(Studio) private studioRepository: Repository<Studio>) {}

  public find = async (searchCharacterDto: SearchStudioDto): Promise<Studio[]> => {
    const { name, id } = searchCharacterDto;
    const searchQuery = this.studioRepository.createQueryBuilder('studio');

    if (name) searchQuery.where('studio.name = :name', { name: name });
    if (id) searchQuery.andWhere('studio.id = :id', { id: id });

    return searchQuery.getMany();
  };
}
