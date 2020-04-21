import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class GenericUpdate<REPO, UPDATE_DTO> {
  update = async (repository: Repository<REPO>, id: number, updateDto: UPDATE_DTO): Promise<object> => {
    await repository
      .createQueryBuilder()
      .update()
      .where(`id = :id`, { id: id })
      .set(updateDto)
      .execute();

    return { id: id };
  };
}
