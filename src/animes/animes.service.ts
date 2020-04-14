import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from './animes.entity';
import { Repository, DeleteResult, Connection, InsertResult, UpdateResult } from 'typeorm';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { SearchAnimeDto } from './dto/search-anime.dto';

@Injectable()
export class AnimesService {
  constructor(@InjectRepository(Anime) private animeRepository: Repository<Anime>, private connection: Connection) {}

  findAll(searchAnimeDto: SearchAnimeDto): Promise<Anime[]> {
    const { romajiTitle, englishTitle, nativeTitle, avgScore, popularity, studioId, tags } = searchAnimeDto;

    const searchQuery = this.animeRepository.createQueryBuilder('anime').leftJoinAndSelect('anime.studio', 'studio');

    if (romajiTitle) searchQuery.where(`anime.romajiTitle = :romajiTitle`, { romajiTitle: romajiTitle });
    if (englishTitle) searchQuery.andWhere(`anime.englishTitle = :englishTitle`, { englishTitle: englishTitle });
    if (nativeTitle) searchQuery.andWhere(`anime.nativeTitle = :nativeTitle`, { nativeTitle: nativeTitle });
    if (avgScore) searchQuery.andWhere(`anime.avgScore >= :avgScore`, { avgScore: avgScore });
    if (popularity) searchQuery.andWhere(`anime.popularity >= :popularity`, { popularity: popularity });
    if (studioId) searchQuery.andWhere(`anime.studioId = :studioId`, { studioId: studioId });
    if (tags) {
      searchQuery.innerJoinAndSelect('anime.tags', 'tags').andWhere(`tags.id IN (:...tags)`, { tags: tags });
    }

    return searchQuery.getMany();
  }

  findOne(id: string): Promise<Anime> {
    return this.animeRepository
      .createQueryBuilder('anime')
      .leftJoinAndSelect('anime.studio', 'studio')
      .leftJoinAndSelect('anime.tags', 'tags')
      .where(`anime.id = :id`, { id: id })
      .getOne();
  }

  async create(createAnimeDto: CreateAnimeDto): Promise<InsertResult> {
    const { tags, ...createAnimeFields } = createAnimeDto;

    return await this.connection.transaction<InsertResult>(async manager => {
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

      return insertStage;
    });
  }

  async update(id: string, updateAnimeDto: UpdateAnimeDto): Promise<UpdateResult> {
    const { addTags, removeTags, ...updateAnimeFields } = updateAnimeDto;

    return await this.connection.transaction<UpdateResult>(async manager => {
      const updateStage = await manager
        .getRepository('anime')
        .createQueryBuilder()
        .update()
        .set({ englishTitle: 'fdlk' })
        .where('id = :id', { id: id })
        .execute();

      await manager
        .createQueryBuilder()
        .relation('anime', 'tags')
        .of(id)
        .add(13);

      // if (removeTags) {
      //   await manager
      //     .createQueryBuilder()
      //     .relation('anime', 'tags')
      //     .of(id)
      //     .remove(removeTags);
      // }

      return updateStage;
    });
  }

  delete(id: string): Promise<DeleteResult> {
    return this.animeRepository.delete(id);
  }
}
