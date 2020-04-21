import { Module } from '@nestjs/common';
import { ExternalLinksController } from './external-links.controller';
import { ExternalLinksService } from './external-links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalLink } from './external-links.entity';
import { SearchExternalLinks } from './providers/search-external-links';

@Module({
  imports: [TypeOrmModule.forFeature([ExternalLink])],
  controllers: [ExternalLinksController],
  providers: [ExternalLinksService, SearchExternalLinks],
})
export class ExternalLinksModule {}
