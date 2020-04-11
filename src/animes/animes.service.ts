import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from './animes.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { Tag } from 'src/tags/tags.entity';
import { Studio } from 'src/studios/studios.entity';
import { SearchAnimeDto } from './dto/search-anime.dto';

@Injectable()
export class AnimesService {
  constructor(@InjectRepository(Anime) private animeRepository: Repository<Anime>) {}

  findAll(searchQuery: SearchAnimeDto): Promise<Anime[]> {
    const tag = new Tag();
    tag.id = 4;
    return this.animeRepository.find({ tags: [{ id: 4 }] });
  }

  findOne(id: string): Promise<Anime> {
    return this.animeRepository.findOneOrFail(id);
  }

  create({ studioId, tags, ...animeCreateField }: CreateAnimeDto): Promise<Anime> {
    const anime = { ...new Anime(), ...animeCreateField };

    if (studioId) {
      const studio = new Studio();
      studio.id = Number(studioId);
      anime.studio = studio;
    }

    if (tags) {
      anime.tags = tags.map(tag => {
        const newTag = new Tag();
        newTag.id = Number(tag);
        return newTag;
      });
    }

    return this.animeRepository.save(anime);
  }

  async update(id: string, { studioId, addTags, removeTags, ...animeUpdateFields }: UpdateAnimeDto): Promise<Anime> {
    const animeToUpdate = {
      ...(await this.animeRepository.findOneOrFail(id, { relations: ['tags', 'studio'] })),
      ...animeUpdateFields,
    };

    if (studioId) {
      const studio = new Studio();
      studio.id = Number(studioId);
      animeToUpdate.studio = studio;
    }

    if (addTags) {
      animeToUpdate.tags.push(
        ...addTags
          .filter(newTag => animeToUpdate.tags.findIndex(el => Number(newTag) === Number(el.id)) === -1)
          .map(tag => {
            const newTag = new Tag();
            newTag.id = Number(tag);
            return newTag;
          }),
      );
    }

    if (removeTags) {
      animeToUpdate.tags = animeToUpdate.tags.filter(tag => removeTags.indexOf(String(tag.id)) === -1);
    }

    return this.animeRepository.save(animeToUpdate);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.animeRepository.delete(id);
  }
}
