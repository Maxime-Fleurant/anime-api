import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { Studio } from './studios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudioDto } from './dto/create-studio.dto';

@Injectable()
export class StudiosService {
  constructor(
    @InjectRepository(Studio) private studioRepository: Repository<Studio>,
  ) {}

  findAll(): Promise<Studio[]> {
    return this.studioRepository.find();
  }

  findOne(id: string): Promise<Studio> {
    return this.studioRepository.findOneOrFail(id);
  }

  create(createStudioDto: CreateStudioDto): Promise<Studio> {
    return this.studioRepository.save(createStudioDto);
  }

  update(id: string, createStudioDto: CreateStudioDto): Promise<UpdateResult> {
    return this.studioRepository.update(id, createStudioDto);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.studioRepository.delete(id);
  }
}
