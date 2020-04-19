import { Injectable } from '@nestjs/common';
import { Anime } from './animes.entity';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { SearchAnimeDto } from './dto/search-anime.dto';
import { CreateAnimes } from './providers/create-animes';
import { UpdateAnimes } from './providers/update-animes';
import { DeleteAnimes } from './providers/delete-animes';
import { SearchAnime } from './providers/search-animes';

@Injectable()
export class AnimesService {
  constructor(
    private searchAnime: SearchAnime,
    private createAnime: CreateAnimes,
    private updateAnime: UpdateAnimes,
    private deleteAnime: DeleteAnimes,
  ) {}

  getAnimes(searchAnimeDto: SearchAnimeDto): Promise<Anime[]> {
    return this.searchAnime.find(searchAnimeDto);
  }

  getAnime(id: number): Promise<Anime[]> {
    return this.searchAnime.find({ id: id });
  }

  async postAnime(createAnimeDto: CreateAnimeDto): Promise<object> {
    return this.createAnime.create(createAnimeDto);
  }

  async update(id: string, updateAnimeDto: UpdateAnimeDto): Promise<object> {
    return this.updateAnime.update({ id, updateData: updateAnimeDto });
  }

  async delete(id: string): Promise<string> {
    return this.deleteAnime.delete(id);
  }
}
