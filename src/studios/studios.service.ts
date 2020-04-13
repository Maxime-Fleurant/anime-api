import { Injectable } from '@nestjs/common';
import { Repository, DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Studio } from './studios.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudioDto } from './dto/create-studio.dto';
import { SearchStudioDto } from './dto/search-studio.dto';

@Injectable()
export class StudiosService {
  constructor(@InjectRepository(Studio) private studioRepository: Repository<Studio>) {}

  findAll({ name }: SearchStudioDto): Promise<Studio[]> {
    const updateQuery = this.studioRepository.createQueryBuilder('studio');

    if (name) updateQuery.where('studio.name = :name', { name: name });

    return updateQuery.getMany();
  }

  findOne(id: number): Promise<Studio> {
    return this.studioRepository
      .createQueryBuilder()
      .where(`id = :id`, { id: id })
      .getOne();
  }

  create(createStudioDto: CreateStudioDto): Promise<InsertResult> {
    return this.studioRepository
      .createQueryBuilder()
      .insert()
      .values(createStudioDto)
      .execute();
  }

  update(id: number, createStudioDto: CreateStudioDto): Promise<UpdateResult> {
    return this.studioRepository
      .createQueryBuilder()
      .update()
      .set(createStudioDto)
      .where(`id = :id`, { id: id })
      .execute();
  }

  delete(id: number): Promise<DeleteResult> {
    return this.studioRepository
      .createQueryBuilder()
      .delete()
      .where(`id = :id`, { id: id })
      .execute();
  }
}
