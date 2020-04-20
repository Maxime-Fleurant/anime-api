import { Module } from '@nestjs/common';
import { ExternalLinksController } from './external-links.controller';
import { ExternalLinksService } from './external-links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalLink } from './external-links.entity';
import { CreateExternalLinks } from './providers/create-external-links';
import { UpdateExternalLinks } from './providers/update-external-links';
import { SearchExternalLinks } from './providers/search-external-links';
import { DeleteExternalLinks } from './providers/delete-external-links';

@Module({
  imports: [TypeOrmModule.forFeature([ExternalLink])],
  controllers: [ExternalLinksController],
  providers: [ExternalLinksService, CreateExternalLinks, UpdateExternalLinks, SearchExternalLinks, DeleteExternalLinks],
})
export class ExternalLinksModule {}
