import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalLink } from '../external-links.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeleteExternalLinks {
  constructor(@InjectRepository(ExternalLink) private externalLinkRepository: Repository<ExternalLink>) {}

  delete = async (id: string): Promise<string> => {
    await this.externalLinkRepository
      .createQueryBuilder()
      .delete()
      .where(`id = :id`, { id: id })
      .execute();

    return 'deleted';
  };
}
