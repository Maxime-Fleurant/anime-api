import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { Character } from './character.entity';
import { SearchCharacterDto } from './dto/search-character.dto';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private characterService: CharactersService) {}

  @Get()
  getCharacters(@Query() searchCharacterDto: SearchCharacterDto): Promise<Character[]> {
    return this.characterService.getCharacters(searchCharacterDto);
  }

  @Get(':id')
  getCharacter(@Param('id') id: number): Promise<Character[]> {
    return this.characterService.getCharacter(id);
  }

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto): Promise<object> {
    return this.characterService.create(createCharacterDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCharacterDto: UpdateCharacterDto): Promise<object> {
    return this.characterService.update(id, updateCharacterDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<string> {
    return this.characterService.delete(id);
  }
}
