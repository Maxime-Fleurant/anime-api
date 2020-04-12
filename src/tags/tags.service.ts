import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tags.entity';
import { Repository, DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { SearchTagDto } from './dto/search-tags.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  findAll({ themeId, name }: SearchTagDto): Promise<Tag[]> {
    const searchQuery = this.tagRepository.createQueryBuilder('tag');

    if (name) searchQuery.where(`tag.name = :name`, { name: name });
    if (themeId) searchQuery.andWhere(`tag.theme = :themeId`, { themeId: themeId });

    return searchQuery.getMany();
  }

  findOne(id: number): Promise<Tag> {
    return this.tagRepository
      .createQueryBuilder('studio')
      .where(`id = :id`, { id: id })
      .getOne();
  }

  create({ themeId, name, description }: CreateTagDto): Promise<InsertResult> {
    return this.tagRepository
      .createQueryBuilder()
      .insert()
      .values({ name: name, description: description, theme: { id: themeId } })
      .execute();
  }

  update(id: string, updateTagDto: UpdateTagDto): Promise<UpdateResult> {
    const updateQuery = this.tagRepository
      .createQueryBuilder()
      .update()
      .set(updateTagDto)
      .where(`id = :id`, { id: id });

    return updateQuery.execute();
  }

  delete(id: string): Promise<DeleteResult> {
    return this.tagRepository
      .createQueryBuilder('studio')
      .delete()
      .where(`id = :id`, { id: id })
      .execute();
  }
}
