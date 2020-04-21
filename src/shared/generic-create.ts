import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class GenericCreate<REPO, CREATE_DTO> {
  create = async (repository: Repository<REPO>, createDto: CREATE_DTO): Promise<object> => {
    const createQuery = await repository
      .createQueryBuilder()
      .insert()
      .values(createDto)
      .execute();

    return { id: createQuery.identifiers[0].id };
  };
}
