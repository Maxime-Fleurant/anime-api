import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from '../animes.entity';
import { Repository, Connection } from 'typeorm';
import { UpdateAnimeDto } from '../dto/update-anime.dto';

interface UpdateAnimeObj {
  id: string;
  updateData: UpdateAnimeDto;
}

@Injectable()
export class UpdateAnimes {
  constructor(@InjectRepository(Anime) private animeRepository: Repository<Anime>, private connection: Connection) {}

  public async update(updateAnimeObj: UpdateAnimeObj): Promise<object> {
    const { id, updateData } = updateAnimeObj;
    const { addTags, removeTags, addGenres, removeGenres, ...updateAnimeFields } = updateData;

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
}
