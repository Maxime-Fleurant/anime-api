import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { CharactersService } from './characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharactersService) {}

  @Get()
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  findOne() {
    return this.characterService.findOne();
  }

  @Post()
  create() {
    return this.characterService.create();
  }

  @Put()
  update() {
    return this.characterService.update();
  }

  @Delete()
  delete() {
    return this.characterService.delete();
  }
}
