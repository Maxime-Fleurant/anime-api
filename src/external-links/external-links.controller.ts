import { Controller, Get, Query, Param, Body, Post, Put, Delete, UseGuards } from '@nestjs/common';
import { ExternalLinksService } from './external-links.service';
import { ExternalLink } from './external-links.entity';
import { SearchExternalLinkDto } from './dto/search-external-link.dto';
import { CreateExternalLinkDto } from './dto/create-external-link.dto';
import { UpdateExternalLinkDto } from './dto/update-external-link.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';

@Controller('external-links')
export class ExternalLinksController {
  constructor(private externalLinkService: ExternalLinksService) {}

  @Get()
  getExternalLinks(@Query() searchExternalLinkDto: SearchExternalLinkDto): Promise<ExternalLink[]> {
    return this.externalLinkService.getExternalLinksOrchestration(searchExternalLinkDto);
  }

  @Get(':id')
  getExternalLink(@Param('id') id: number): Promise<ExternalLink[]> {
    return this.externalLinkService.findOneOrchestration(id);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  postExternalLink(@Body() createExternalLinkDto: CreateExternalLinkDto): Promise<object> {
    return this.externalLinkService.postOrchestration(createExternalLinkDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Put(':id')
  putExternalLink(@Param('id') id: number, @Body() updateExternalLinkDto: UpdateExternalLinkDto): Promise<object> {
    return this.externalLinkService.putOrchestration(id, updateExternalLinkDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  deleteExternalLink(@Param('id') id: number): Promise<string> {
    return this.externalLinkService.deleteOrchestration(id);
  }
}
