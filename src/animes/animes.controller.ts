import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { AnimesService } from './animes.service';

@Controller('animes')
export class AnimesController {
  constructor(private animeService: AnimesService) {}

  @Get()
  findAll() {
    return this.animeService.findAll();
  }

  @Get(':id')
  findOne() {
    return this.animeService.findOne();
  }

  @Post()
  create() {
    return this.animeService.create();
  }

  @Put()
  update() {
    return this.animeService.update();
  }

  @Delete()
  delete() {
    return this.animeService.delete();
  }
}
