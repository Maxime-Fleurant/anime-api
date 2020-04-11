import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './tags.entity';
import { CreateTagDto } from './dto/create-tag.dto';
import { DeleteResult } from 'typeorm';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  findAll(@Query() searchQuery: CreateTagDto): Promise<Tag[]> {
    return this.tagsService.findAll(searchQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tag> {
    return this.tagsService.findOne(id);
  }

  @Post()
  create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagsService.create(createTagDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagsService.update(id, createTagDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.tagsService.delete(id);
  }
}
