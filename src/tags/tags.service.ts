import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tags.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Theme } from 'src/themes/themes.entity';
import { SearchTagDto } from './dto/search-tags.dto';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  findAll({ themeId, ...searchQuery }: SearchTagDto): Promise<Tag[]> {
    return this.tagRepository.find({ ...searchQuery, theme: { id: Number(themeId) } });
  }

  findOne(id: string): Promise<Tag> {
    return this.tagRepository.findOneOrFail(id);
  }

  create({ themeId, ...createTagField }: CreateTagDto): Promise<Tag> {
    const newTag = this.tagRepository.create({ ...createTagField, theme: { id: Number(themeId) } });

    return this.tagRepository.save(newTag);
  }

  async update(id: string, { themeId, ...createTagFields }: CreateTagDto): Promise<Tag> {
    const tagToUpdate = {
      ...(await this.tagRepository.findOneOrFail(id, { relations: ['theme'] })),
      ...createTagFields,
    };

    if (themeId) {
      const theme = new Theme();
      theme.id = Number(themeId);
      tagToUpdate.theme = theme;
    }

    return this.tagRepository.save(tagToUpdate);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.tagRepository.delete(id);
  }
}
