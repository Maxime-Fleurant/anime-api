import { Injectable } from '@nestjs/common';

@Injectable()
export class AnimesService {
  findAll() {
    return 'findAll';
  }

  findOne() {
    return 'findOne';
  }

  create() {
    return 'create';
  }

  update() {
    return 'update';
  }

  delete() {
    return 'delete';
  }
}
