import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { StudiosService } from './studios.service';
import { Studio } from './studios.entity';
import { CreateStudioDto } from './dto/create-studio.dto';
import { SearchStudioDto } from './dto/search-studio.dto';

@Controller('studios')
export class StudiosController {
  constructor(private studioService: StudiosService) {}

  @Get()
  findAll(@Query() searchQuery: SearchStudioDto): Promise<Studio[]> {
    return this.studioService.findAll(searchQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Studio> {
    return this.studioService.findOne(id);
  }

  @Post()
  create(@Body() createStudioDto: CreateStudioDto): Promise<object> {
    return this.studioService.create(createStudioDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() createStudioDto: CreateStudioDto): Promise<object> {
    return this.studioService.update(id, createStudioDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<string> {
    return this.studioService.delete(id);
  }
}
