import { Controller, Get, Post, Put, Delete, Query, Param, Body, UseGuards } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Character } from './character.entity';
import { SearchCharacterDto } from './dto/search-character.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/admin.guard';

@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharactersService) {}

  @Get()
  getCharacters(@Query() searchCharacterDto: SearchCharacterDto): Promise<Character[]> {
    return this.characterService.getCharacters(searchCharacterDto);
  }

  @Get(':id')
  getCharacter(@Param('id') id: number): Promise<Character[]> {
    return this.characterService.findOneOrchestration(id);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto): Promise<object> {
    return this.characterService.postOrchestration(createCharacterDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Put(':id')
  update(@Param('id') id: number, @Body() updateCharacterDto: UpdateCharacterDto): Promise<object> {
    return this.characterService.putOrchestration(id, updateCharacterDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  delete(@Param('id') id: number): Promise<string> {
    return this.characterService.deleteOrchestration(id);
  }
}
