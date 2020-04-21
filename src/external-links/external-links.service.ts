import { Injectable } from '@nestjs/common';
import { ExternalLink } from './external-links.entity';
import { CreateExternalLinkDto } from './dto/create-external-link.dto';
import { UpdateExternalLinkDto } from './dto/update-external-link.dto';
import { SearchExternalLinkDto } from './dto/search-external-link.dto';
import { GenericServiceOrchestratorFactory } from 'src/shared/generic-service-orchestrator';
import { SearchExternalLinks } from './providers/search-external-links';

@Injectable()
export class ExternalLinksService extends GenericServiceOrchestratorFactory<
  ExternalLink,
  CreateExternalLinkDto,
  UpdateExternalLinkDto
>(ExternalLink) {
  constructor(private searchExternalLinkProvider: SearchExternalLinks) {
    super();
  }
  getExternalLinksOrchestration(searchExternalLinkDto: SearchExternalLinkDto): Promise<ExternalLink[]> {
    return this.searchExternalLinkProvider.find(searchExternalLinkDto);
  }
}
