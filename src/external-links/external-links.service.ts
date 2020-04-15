import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExternalLink } from './external-links.entity';
import { SearchExternalLinkDto } from './dto/search-external-link.dto';
import { CreateExternalLinkDto } from './dto/create-external-link.dto';
import { UpdateExternalLinkDto } from './dto/update-external-link.dto';

@Injectable()
export class ExternalLinksService {
  constructor(@InjectRepository(ExternalLink) private externalLinkRepository: Repository<ExternalLink>) {}

  findAll(searchExternalLinkDto: SearchExternalLinkDto): Promise<ExternalLink[]> {
    const { animeId } = searchExternalLinkDto;
    const searchQuery = this.externalLinkRepository.createQueryBuilder('external_link');

    if (animeId) searchQuery.where(`external_link.animeId = :animeId`, { animeId: animeId });

    return searchQuery.getMany();
  }

  findOne(id: string): Promise<ExternalLink> {
    return this.externalLinkRepository
      .createQueryBuilder('external_link')
      .leftJoinAndSelect('external_link.anime', 'animes')
      .where('external_link.id = :id', { id: id })
      .getOne();
  }

  async create(createExternalLinkDto: CreateExternalLinkDto): Promise<object> {
    const createQuery = await this.externalLinkRepository
      .createQueryBuilder()
      .insert()
      .values(createExternalLinkDto)
      .execute();

    return { id: createQuery.identifiers[0].id };
  }

  async update(id: string, updateExternalLinkDto: UpdateExternalLinkDto): Promise<object> {
    await this.externalLinkRepository
      .createQueryBuilder()
      .update()
      .where(`id = :id`, { id: id })
      .set(updateExternalLinkDto)
      .execute();

    return { id: id };
  }

  async delete(id: string): Promise<string> {
    await this.externalLinkRepository
      .createQueryBuilder()
      .delete()
      .where(`id = :id`, { id: id })
      .execute();

    return 'deleted';
  }
}
