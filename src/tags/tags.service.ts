import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tags.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { SearchTagDto } from './dto/search-tags.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  findAll(searchTagDto: SearchTagDto): Promise<Tag[]> {
    const { themeId, name } = searchTagDto;
    const searchQuery = this.tagRepository.createQueryBuilder('tag');

    if (name) searchQuery.where(`tag.name = :name`, { name: name });
    if (themeId) searchQuery.andWhere(`tag.theme = :themeId`, { themeId: themeId });

    return searchQuery.getMany();
  }

  findOne(id: number): Promise<Tag> {
    return this.tagRepository
      .createQueryBuilder()
      .where(`id = :id`, { id: id })
      .getOne();
  }

  async create(createTagDto: CreateTagDto): Promise<object> {
    const createQuery = await this.tagRepository
      .createQueryBuilder()
      .insert()
      .values(createTagDto)
      .execute();

    return { id: createQuery.identifiers[0].id };
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<object> {
    await this.tagRepository
      .createQueryBuilder()
      .update()
      .set(updateTagDto)
      .where(`id = :id`, { id: id })
      .execute();

    return { id: id };
  }

  async delete(id: string): Promise<string> {
    await this.tagRepository
      .createQueryBuilder()
      .delete()
      .where(`id = :id`, { id: id })
      .execute();

    return 'deleted';
  }
}
