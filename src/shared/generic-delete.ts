import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class GenericDelete<REPO> {
  delete = async (repository: Repository<REPO>, id: number): Promise<string> => {
    await repository
      .createQueryBuilder()
      .delete()
      .where(`id = :id`, { id: id })
      .execute();

    return 'deleted';
  };
}
