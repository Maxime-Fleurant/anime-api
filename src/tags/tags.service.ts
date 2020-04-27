import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tags.entity';
import { Repository } from 'typeorm';
import { SearchTagDto } from './dto/search-tags.dto';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { GenericServiceOrchestratorFactory } from '../shared/generic-service-orchestrator';

@Injectable()
export class TagsService extends GenericServiceOrchestratorFactory<Tag, CreateTagDto, UpdateTagDto>(Tag) {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {
    super();
  }

  findManyTagsOrchestration(searchTagDto: SearchTagDto): Promise<Tag[]> {
    const { themeId, name, id } = searchTagDto;
    const searchQuery = this.tagRepository.createQueryBuilder('tag');

    if (name) searchQuery.where(`tag.name = :name`, { name: name });
    if (themeId) searchQuery.andWhere(`tag.theme = :themeId`, { themeId: themeId });
    if (id) searchQuery.andWhere('tag.id = :id', { id: id });

    return searchQuery.getMany();
  }
}
