import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { StudiosService } from './studios.service';
import { Studio } from './studios.entity';
import { CreateStudioDto } from './dto/create-studio.dto';
import { SearchStudioDto } from './dto/search-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { AdminGuard } from 'src/auth/admin.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('studios')
export class StudiosController {
  constructor(private studioService: StudiosService) {}

  @Get()
  getStudiosController(@Query() searchQuery: SearchStudioDto): Promise<Studio[]> {
    return this.studioService.findManyStudioOrchestration(searchQuery);
  }

  @Get(':id')
  getStudioController(@Param('id') id: number): Promise<Studio[]> {
    return this.studioService.findOneOrchestration(id);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Post()
  postStudioControler(@Body() createStudioDto: CreateStudioDto): Promise<object> {
    return this.studioService.postOrchestration(createStudioDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Put(':id')
  putStudioController(@Param('id') id: number, @Body() updateStudioDto: UpdateStudioDto): Promise<object> {
    return this.studioService.putOrchestration(id, updateStudioDto);
  }

  @UseGuards(AuthGuard('jwt'), AdminGuard)
  @Delete(':id')
  deleteStudioController(@Param('id') id: number): Promise<string> {
    return this.studioService.deleteOrchestration(id);
  }
}
