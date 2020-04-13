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

  findAll(searchAnimeDto: SearchAnimeDto): Promise<Anime[]> {
    const { romajiTitle, englishTitle, nativeTitle, avgScore, popularity, studioId, tags } = searchAnimeDto;

    const searchQuery = this.animeRepository.createQueryBuilder('anime').leftJoinAndSelect('anime.tags', 'tags');
    console.log(searchQuery.getSql());
    if (romajiTitle) searchQuery.where(`anime.romajiTitle = :romajiTitle`, { romajiTitle: romajiTitle });
    if (englishTitle) searchQuery.andWhere(`anime.englishTitle = :englishTitle`, { englishTitle: englishTitle });
    if (nativeTitle) searchQuery.andWhere(`anime.nativeTitle = :nativeTitle`, { nativeTitle: nativeTitle });
    if (avgScore) searchQuery.andWhere(`anime.avgScore >= :avgScore`, { avgScore: avgScore });
    if (popularity) searchQuery.andWhere(`anime.popularity >= :popularity`, { popularity: popularity });
    if (studioId) searchQuery.andWhere(`anime.studioId = :studioId`, { studioId: studioId });
    if (tags) {
      searchQuery.innerJoin('anime.tags', 'tags').andWhere(`tags.id IN (:...tags)`, { tags: tags });
    }
    console.log(searchQuery.getSql());
    return searchQuery.getMany();
  }

  findOne(id: string): Promise<Anime> {
    console.log(
      this.animeRepository
        .createQueryBuilder()
        .where(`id = :id`, { id: id })
        .getSql(),
    );
    return this.animeRepository
      .createQueryBuilder('anime')
      .innerJoinAndSelect('anime.tags', 'tags')
      .where(`anime.id = :id`, { id: id })
      .getOne();
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
