import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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

  async create(createStudioDto: CreateStudioDto): Promise<object> {
    const createQuery = await this.studioRepository
      .createQueryBuilder()
      .insert()
      .values(createStudioDto)
      .execute();

    return { id: createQuery.identifiers[0].id };
  }

  async update(id: number, createStudioDto: CreateStudioDto): Promise<object> {
    await this.studioRepository
      .createQueryBuilder()
      .update()
      .set(createStudioDto)
      .where(`id = :id`, { id: id })
      .execute();

    return { id: id };
  }

  async delete(id: number): Promise<string> {
    await this.studioRepository
      .createQueryBuilder()
      .delete()
      .where(`id = :id`, { id: id })
      .execute();

    return 'deleted';
  }
}
