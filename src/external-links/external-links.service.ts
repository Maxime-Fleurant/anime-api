import { Injectable } from '@nestjs/common';
import { ExternalLink } from './external-links.entity';
import { SearchExternalLinkDto } from './dto/search-external-link.dto';
import { CreateExternalLinkDto } from './dto/create-external-link.dto';
import { UpdateExternalLinkDto } from './dto/update-external-link.dto';
import { SearchExternalLinks } from './providers/search-external-links';
import { CreateExternalLinks } from './providers/create-external-links';
import { UpdateExternalLinks } from './providers/update-external-links';
import { DeleteExternalLinks } from './providers/delete-external-links';

@Injectable()
export class ExternalLinksService {
  constructor(
    private searchExternalLinkProvider: SearchExternalLinks,
    private createExternalLinkProvider: CreateExternalLinks,
    private updateExternalLinkProvider: UpdateExternalLinks,
    private deleteExternealLinkProvider: DeleteExternalLinks,
  ) {}

  getExternalLinksOrchestration(searchExternalLinkDto: SearchExternalLinkDto): Promise<ExternalLink[]> {
    return this.searchExternalLinkProvider.find(searchExternalLinkDto);
  }

  getExternalLinkOrchestration(id: number): Promise<ExternalLink[]> {
    return this.searchExternalLinkProvider.find({ id });
  }

  async postExternalLinkOrchestration(createExternalLinkDto: CreateExternalLinkDto): Promise<object> {
    return this.createExternalLinkProvider.create(createExternalLinkDto);
  }

  async putExternalLinkOrchestration(id: number, updateExternalLinkDto: UpdateExternalLinkDto): Promise<object> {
    return this.updateExternalLinkProvider.update({ id, updateData: updateExternalLinkDto });
  }

  async deleteExternalLinkOrchestration(id: string): Promise<string> {
    return this.deleteExternealLinkProvider.delete(id);
  }
}
