import { Controller, Get, Post, Delete, Put, Param, Body, Query } from '@nestjs/common';
import { AnimesService } from './animes.service';
import { Anime } from './animes.entity';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { SearchAnimeDto } from './dto/search-anime.dto';

@Controller('animes')
export class AnimesController {
  constructor(private animeService: AnimesService) {}

  @Get()
  findAll(@Query() searchAnimeDto: SearchAnimeDto): Promise<Anime[]> {
    return this.animeService.findAll(searchAnimeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Anime> {
    return this.animeService.findOne(id);
  }

  @Post()
  create(@Body() createAnimeDto: CreateAnimeDto): Promise<object> {
    return this.animeService.create(createAnimeDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto): Promise<object> {
    return this.animeService.update(id, updateAnimeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.animeService.delete(id);
  }
}
