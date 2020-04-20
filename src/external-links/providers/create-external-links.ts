import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalLink } from '../external-links.entity';
import { Repository } from 'typeorm';
import { CreateExternalLinkDto } from '../dto/create-external-link.dto';

@Injectable()
export class CreateExternalLinks {
  constructor(@InjectRepository(ExternalLink) private externalLinkRepository: Repository<ExternalLink>) {}

  create = async (createExternalLinkDto: CreateExternalLinkDto): Promise<object> => {
    const createQuery = await this.externalLinkRepository
      .createQueryBuilder()
      .insert()
      .values(createExternalLinkDto)
      .execute();

    return { id: createQuery.identifiers[0].id };
  };
}
