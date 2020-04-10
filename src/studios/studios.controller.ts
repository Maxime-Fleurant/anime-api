import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { StudiosService } from './studios.service';
import { Studio } from './studios.entity';
import { CreateStudioDto } from './dto/create-studio.dto';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('studios')
export class StudiosController {
  constructor(private studioService: StudiosService) {}

  @Get()
  findAll(): Promise<Studio[]> {
    return this.studioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Studio> {
    return this.studioService.findOne(id);
  }

  @Post()
  create(@Body() createStudioDto: CreateStudioDto): Promise<Studio> {
    return this.studioService.create(createStudioDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createStudioDto: CreateStudioDto,
  ): Promise<UpdateResult> {
    return this.studioService.update(id, createStudioDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.studioService.delete(id);
  }
}
