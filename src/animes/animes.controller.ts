import { Controller, Get, Post, Delete, Put, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AnimesService } from './animes.service';
import { Anime } from './animes.entity';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { SearchAnimeDto } from './dto/search-anime.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../auth/admin.guard';

@Controller('animes')
export class AnimesController {
  constructor(private animeService: AnimesService) {}

  @Get()
  getAnimes(@Query() searchAnimeDto: SearchAnimeDto): Promise<Anime[]> {
    return this.animeService.getAnimes(searchAnimeDto);
  }

  @Get(':id')
  getAnime(@Param('id') id: number): Promise<Anime[]> {
    return this.animeService.getAnime(id);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  postAnime(@Body() createAnimeDto: CreateAnimeDto): Promise<object> {
    return this.animeService.postAnime(createAnimeDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto): Promise<object> {
    return this.animeService.update(id, updateAnimeDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.animeService.delete(id);
  }
}
