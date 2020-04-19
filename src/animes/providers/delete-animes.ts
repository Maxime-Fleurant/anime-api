import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Anime } from '../animes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteAnimes {
  constructor(@InjectRepository(Anime) private animeRepository: Repository<Anime>) {}

  public async delete(id: string): Promise<string> {
    await this.animeRepository.delete(id);

    return 'deleted';
  }
}
