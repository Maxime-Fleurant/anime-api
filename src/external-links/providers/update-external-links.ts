import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExternalLink } from '../external-links.entity';
import { Repository } from 'typeorm';
import { UpdateExternalLinkDto } from '../dto/update-external-link.dto';

export interface UpdateExternalLinkParams {
  id: number;
  updateData: UpdateExternalLinkDto;
}

@Injectable()
export class UpdateExternalLinks {
  constructor(@InjectRepository(ExternalLink) private externalLinkRepository: Repository<ExternalLink>) {}

  update = async (updateExternalLinkParams: UpdateExternalLinkParams): Promise<object> => {
    const { id, updateData } = updateExternalLinkParams;

    await this.externalLinkRepository
      .createQueryBuilder()
      .update()
      .where(`id = :id`, { id: id })
      .set(updateData)
      .execute();

    return { id: id };
  };
}
