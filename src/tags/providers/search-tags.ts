import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tags.entity';
import { SearchTagDto } from '../dto/search-tags.dto';

@Injectable()
export class SearchTag {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  public find = async (searchTagDto: SearchTagDto): Promise<Tag[]> => {
    const { themeId, name, id } = searchTagDto;
    const searchQuery = this.tagRepository.createQueryBuilder('tag');

    if (name) searchQuery.where(`tag.name = :name`, { name: name });
    if (themeId) searchQuery.andWhere(`tag.theme = :themeId`, { themeId: themeId });
    if (id) searchQuery.andWhere('tag.id = :id', { id: id });

    return searchQuery.getMany();
  };
}
