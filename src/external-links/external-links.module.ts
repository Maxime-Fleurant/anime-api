import { Module } from '@nestjs/common';
import { ExternalLinksController } from './external-links.controller';
import { ExternalLinksService } from './external-links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalLink } from './external-links.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExternalLink])],
  controllers: [ExternalLinksController],
  providers: [ExternalLinksService],
})
export class ExternalLinksModule {}
