import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from './animes.entity';
import { Repository, Connection } from 'typeorm';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { SearchAnimeDto } from './dto/search-anime.dto';

@Injectable()
export class AnimesService {
  constructor(@InjectRepository(Anime) private animeRepository: Repository<Anime>, private connection: Connection) {}

  findAll(searchAnimeDto: SearchAnimeDto): Promise<Anime[]> {
    const { romajiTitle, englishTitle, nativeTitle, avgScore, popularity, studioId, tags, genres } = searchAnimeDto;

    const searchQuery = this.animeRepository.createQueryBuilder('anime').leftJoinAndSelect('anime.studio', 'studio');

    if (romajiTitle) searchQuery.where(`anime.romajiTitle = :romajiTitle`, { romajiTitle: romajiTitle });
    if (englishTitle) searchQuery.andWhere(`anime.englishTitle = :englishTitle`, { englishTitle: englishTitle });
    if (nativeTitle) searchQuery.andWhere(`anime.nativeTitle = :nativeTitle`, { nativeTitle: nativeTitle });
    if (avgScore) searchQuery.andWhere(`anime.avgScore >= :avgScore`, { avgScore: avgScore });
    if (popularity) searchQuery.andWhere(`anime.popularity >= :popularity`, { popularity: popularity });
    if (studioId) searchQuery.andWhere(`anime.studioId = :studioId`, { studioId: studioId });
    if (tags) searchQuery.innerJoinAndSelect('anime.tags', 'tags').andWhere(`tags.id IN (:...tags)`, { tags: tags });
    if (genres)
      searchQuery.innerJoinAndSelect('anime.genres', 'genres').andWhere(`genres.id IN (:...genres)`, { tags: genres });

    return searchQuery.getMany();
  }

  findOne(id: string): Promise<Anime> {
    return this.animeRepository
      .createQueryBuilder('anime')
      .leftJoinAndSelect('anime.studio', 'studio')
      .leftJoinAndSelect('anime.tags', 'tags')
      .leftJoinAndSelect('anime.genres', 'genres')
      .where(`anime.id = :id`, { id: id })
      .getOne();
  }

  async create(createAnimeDto: CreateAnimeDto): Promise<object> {
    const { tags, genres, ...createAnimeFields } = createAnimeDto;

    return await this.connection.transaction<object>(async manager => {
      const insertStage = await manager
        .createQueryBuilder()
        .insert()
        .into('anime')
        .values(createAnimeFields)
        .execute();

      await manager
        .createQueryBuilder()
        .relation('anime', 'tags')
        .of(insertStage.identifiers[0].id)
        .add(tags);

      await manager
        .createQueryBuilder()
        .relation('anime', 'genres')
        .of(insertStage.identifiers[0].id)
        .add(genres);

      return { id: insertStage.identifiers[0].id };
    });
  }

  async update(id: string, updateAnimeDto: UpdateAnimeDto): Promise<object> {
    const { addTags, removeTags, addGenres, removeGenres, ...updateAnimeFields } = updateAnimeDto;

    await this.connection.transaction(async manager => {
      if (Object.keys(updateAnimeFields).length)
        await manager
          .getRepository('anime')
          .createQueryBuilder()
          .update()
          .set(updateAnimeFields)
          .where('id = :id', { id: id })
          .execute();

      if (addTags)
        await manager
          .createQueryBuilder()
          .relation('anime', 'tags')
          .of(id)
          .add(addTags);

      if (removeTags)
        await manager
          .createQueryBuilder()
          .relation('anime', 'tags')
          .of(id)
          .remove(removeTags);

      if (addGenres)
        await manager
          .createQueryBuilder()
          .relation('anime', 'genres')
          .of(id)
          .add(addGenres);

      if (removeGenres)
        await manager
          .createQueryBuilder()
          .relation('anime', 'genres')
          .of(id)
          .remove(removeGenres);
    });

    return { id: id };
  }

  async delete(id: string): Promise<string> {
    await this.animeRepository.delete(id);

    return 'deleted';
  }
}
