import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class GenericDelete<REPO> {
  delete = async (repository: Repository<REPO>, id: number): Promise<string> => {
    const deleteQuery = await repository
      .createQueryBuilder()
      .delete()
      .where(`id = :id`, { id: id })
      .execute();

    return deleteQuery.affected ? 'deleted' : `doesn't exist`;
  };
}
