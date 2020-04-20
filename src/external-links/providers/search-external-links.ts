import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalLink } from '../external-links.entity';
import { Repository } from 'typeorm';
import { SearchExternalLinkDto } from '../dto/search-external-link.dto';

@Injectable()
export class SearchExternalLinks {
  constructor(@InjectRepository(ExternalLink) private externalLinkRepository: Repository<ExternalLink>) {}

  find = async (searchExternalLinkDto: SearchExternalLinkDto): Promise<ExternalLink[]> => {
    const { animeId } = searchExternalLinkDto;
    const searchQuery = this.externalLinkRepository.createQueryBuilder('external_link');

    if (animeId) searchQuery.where(`external_link.animeId = :animeId`, { animeId: animeId });

    return searchQuery.getMany();
  };
}
