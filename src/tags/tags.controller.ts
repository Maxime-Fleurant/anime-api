import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './tags.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { SearchTagDto } from './dto/search-tags.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  findAll(@Query() searchQuery: SearchTagDto): Promise<Tag[]> {
    return this.tagsService.findManyTagsOrchestration(searchQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tag[]> {
    return this.tagsService.findOneOrchestration(id);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  create(@Body() createTagDto: CreateTagDto): Promise<object> {
    return this.tagsService.postOrchestration(createTagDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() createTagDto: UpdateTagDto): Promise<object> {
    return this.tagsService.putOrchestration(id, createTagDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<string> {
    return this.tagsService.deleteOrchestration(id);
  }
}
