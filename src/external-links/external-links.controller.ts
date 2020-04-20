import { Controller, Get, Query, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { ExternalLinksService } from './external-links.service';
import { ExternalLink } from './external-links.entity';
import { SearchExternalLinkDto } from './dto/search-external-link.dto';
import { CreateExternalLinkDto } from './dto/create-external-link.dto';
import { UpdateExternalLinkDto } from './dto/update-external-link.dto';

@Controller('external-links')
export class ExternalLinksController {
  constructor(private externalLinkService: ExternalLinksService) {}

  @Get()
  getExternalLinks(@Query() searchExternalLinkDto: SearchExternalLinkDto): Promise<ExternalLink[]> {
    return this.externalLinkService.getExternalLinksOrchestration(searchExternalLinkDto);
  }

  @Get(':id')
  getExternalLink(@Param('id') id: number): Promise<ExternalLink[]> {
    return this.externalLinkService.getExternalLinkOrchestration(id);
  }

  @Post()
  postExternalLink(@Body() createExternalLinkDto: CreateExternalLinkDto): Promise<object> {
    return this.externalLinkService.postExternalLinkOrchestration(createExternalLinkDto);
  }

  @Put(':id')
  putExternalLink(@Param('id') id: number, @Body() updateExternalLinkDto: UpdateExternalLinkDto): Promise<object> {
    return this.externalLinkService.putExternalLinkOrchestration(id, updateExternalLinkDto);
  }

  @Delete(':id')
  deleteExternalLink(@Param('id') id: string): Promise<string> {
    return this.externalLinkService.deleteExternalLinkOrchestration(id);
  }
}
