import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { Studio } from './studios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudioDto } from './dto/create-studio.dto';
import { SearchStudioDto } from './dto/search-studio.dto';

@Injectable()
export class StudiosService {
  constructor(@InjectRepository(Studio) private studioRepository: Repository<Studio>) {}

  findAll(searchQuery: SearchStudioDto): Promise<Studio[]> {
    console.log(searchQuery);
    return this.studioRepository
      .createQueryBuilder('studio')
      .where('studio.name = :name', searchQuery)
      .getMany();
    return this.studioRepository.find({ where: searchQuery });
  }

  findOne(id: string): Promise<Studio> {
    return this.studioRepository.findOneOrFail(id);
  }

  create(createStudioDto: CreateStudioDto): Promise<Studio> {
    const newStudio = this.studioRepository.create(createStudioDto);

    return this.studioRepository.save(newStudio);
  }

  async update(id: string, udpateStudioQuery: CreateStudioDto): Promise<Studio> {
    const studioToUpdate = { ...(await this.studioRepository.findOneOrFail(id)), ...udpateStudioQuery };

    return this.studioRepository.save(studioToUpdate);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.studioRepository.delete(id);
  }
}
