import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from '../animes.entity';
import { Repository } from 'typeorm';
import { SearchAnimeDto } from '../dto/search-anime.dto';

@Injectable()
export class SearchAnime {
  constructor(@InjectRepository(Anime) private animeRepository: Repository<Anime>) {}

  public find(searchAnimeDto: SearchAnimeDto): Promise<Anime[]> {
    const { id, romajiTitle, englishTitle, nativeTitle, avgScore, popularity, studioId, tags, genres } = searchAnimeDto;

    const searchQuery = this.animeRepository.createQueryBuilder('anime').leftJoinAndSelect('anime.studio', 'studio');

    if (id) searchQuery.where(`anime.id = :id`, { id: id });
    if (romajiTitle) searchQuery.andWhere(`anime.romajiTitle = :romajiTitle`, { romajiTitle: romajiTitle });
    if (englishTitle) searchQuery.andWhere(`anime.englishTitle = :englishTitle`, { englishTitle: englishTitle });
    if (nativeTitle) searchQuery.andWhere(`anime.nativeTitle = :nativeTitle`, { nativeTitle: nativeTitle });
    if (avgScore) searchQuery.andWhere(`anime.avgScore >= :avgScore`, { avgScore: avgScore });
    if (popularity) searchQuery.andWhere(`anime.popularity >= :popularity`, { popularity: popularity });
    if (studioId) searchQuery.andWhere(`anime.studioId = :studioId`, { studioId: studioId });
    if (tags) searchQuery.innerJoinAndSelect('anime.tags', 'tags').andWhere(`tags.id IN (:...tags)`, { tags: tags });
    if (genres)
      searchQuery
        .innerJoinAndSelect('anime.genres', 'genres')
        .andWhere(`genres.id IN (:...genres)`, { genres: genres });

    return searchQuery.getMany();
  }
}
