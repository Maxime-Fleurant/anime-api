import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class GenericSearch<REPO> {
  find = async (repository: Repository<REPO>, id: number): Promise<REPO[]> => {
    const queryBuilder = repository.createQueryBuilder().where(`id = :id`, { id: id });

    return queryBuilder.getMany();
  };
}
