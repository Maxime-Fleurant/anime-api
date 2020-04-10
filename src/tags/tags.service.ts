import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './tags.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { Theme } from 'src/themes/themes.entity';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  findAll(): Promise<Tag[]> {
    return this.tagRepository.find();
  }

  findOne(id: string): Promise<Tag> {
    return this.tagRepository.findOneOrFail(id);
  }

  create({ themeId, ...createTagDto }: CreateTagDto): Promise<Tag> {
    const theme = new Theme();
    theme.id = Number(themeId);

    return this.tagRepository.save({
      ...createTagDto,
      theme: theme,
    });
  }

  update(id: string, { themeId, ...createTagDto }: CreateTagDto): Promise<UpdateResult> {
    const theme = new Theme();
    theme.id = Number(themeId);

    return this.tagRepository.update(id, {
      ...createTagDto,
      theme: theme,
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.tagRepository.delete(id);
  }
}
