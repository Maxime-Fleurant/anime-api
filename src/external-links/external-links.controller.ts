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
  findAll(@Query() searchExternalLinkDto: SearchExternalLinkDto): Promise<ExternalLink[]> {
    return this.externalLinkService.findAll(searchExternalLinkDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ExternalLink> {
    return this.externalLinkService.findOne(id);
  }

  @Post()
  create(@Body() createExternalLinkDto: CreateExternalLinkDto): Promise<object> {
    return this.externalLinkService.create(createExternalLinkDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateExternalLinkDto: UpdateExternalLinkDto): Promise<object> {
    return this.externalLinkService.update(id, updateExternalLinkDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.externalLinkService.delete(id);
  }
}
