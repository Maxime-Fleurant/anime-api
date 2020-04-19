import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Anime } from '../animes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAnimeDto } from '../dto/create-anime.dto';

@Injectable()
export class CreateAnimes {
  constructor(@InjectRepository(Anime) private animeRepository: Repository<Anime>, private connection: Connection) {}

  public async create(createAnimeDto: CreateAnimeDto): Promise<object> {
    const { tags, genres, ...createAnimeFields } = createAnimeDto;

    return await this.connection.transaction<object>(async manager => {
      const insertStage = await manager
        .createQueryBuilder()
        .insert()
        .into('anime')
        .values(createAnimeFields)
        .execute();

      if (tags)
        await manager
          .createQueryBuilder()
          .relation('anime', 'tags')
          .of(insertStage.identifiers[0].id)
          .add(tags);

      if (genres)
        await manager
          .createQueryBuilder()
          .relation('anime', 'genres')
          .of(insertStage.identifiers[0].id)
          .add(genres);

      return { id: insertStage.identifiers[0].id };
    });
  }
}
