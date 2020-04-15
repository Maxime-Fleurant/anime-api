import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './tags.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { SearchTagDto } from './dto/search-tags.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  findAll(@Query() searchQuery: SearchTagDto): Promise<Tag[]> {
    return this.tagsService.findAll(searchQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tag> {
    return this.tagsService.findOne(id);
  }

  @Post()
  create(@Body() createTagDto: CreateTagDto): Promise<object> {
    return this.tagsService.create(createTagDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createTagDto: UpdateTagDto): Promise<object> {
    return this.tagsService.update(id, createTagDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.tagsService.delete(id);
  }
}
