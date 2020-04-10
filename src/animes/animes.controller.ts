import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { AnimesService } from './animes.service';
import { Anime } from './animes.entity';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { DeleteResult } from 'typeorm';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Controller('animes')
export class AnimesController {
  constructor(private animeService: AnimesService) {}

  @Get()
  findAll(): Promise<Anime[]> {
    return this.animeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Anime> {
    return this.animeService.findOne(id);
  }

  @Post()
  create(@Body() createAnimeDto: CreateAnimeDto): Promise<Anime> {
    return this.animeService.create(createAnimeDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto): Promise<Anime> {
    return this.animeService.update(id, updateAnimeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.animeService.delete(id);
  }
}
