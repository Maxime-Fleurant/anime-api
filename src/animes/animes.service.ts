import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from './animes.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { Tag } from 'src/tags/tags.entity';
import { Studio } from 'src/studios/studios.entity';

@Injectable()
export class AnimesService {
  constructor(@InjectRepository(Anime) private animeRepository: Repository<Anime>) {}

  findAll(): Promise<Anime[]> {
    return this.animeRepository.find();
  }

  findOne(id: string): Promise<Anime> {
    return this.animeRepository.findOneOrFail(id);
  }

  create(createAnimeDto: CreateAnimeDto): Promise<Anime> {
    const { studioId, tags, ...animeCreateField } = createAnimeDto;
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

  async update(id: string, updateAnimeDto: UpdateAnimeDto): Promise<Anime> {
    const { studioId, addTags, removeTags, ...animeUpdateFields } = updateAnimeDto;
    const animeToUpdate = {
      ...(await this.animeRepository.findOneOrFail(id, { relations: ['tags', 'studio'] })),
      ...animeUpdateFields,
    };

    if (studioId) {
      const studio = new Studio();
      studio.id = Number(studioId);
      animeToUpdate.studio = studio;
    }

    console.log(
      addTags.filter(
        newTag =>
          animeToUpdate.tags.findIndex(el => {
            console.log(Number(el.id), Number(newTag));
            return Number(newTag) === Number(el.id);
          }) === -1,
      ),
    );

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

    console.log(animeToUpdate);
    return this.animeRepository.save(animeToUpdate);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.animeRepository.delete(id);
  }
}
