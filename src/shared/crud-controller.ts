import { InsertResult, UpdateResult } from 'typeorm';
import { Inject, Get, Body, Post, Type } from '@nestjs/common';

interface ICrudService<T> {
  postOrchestration(dto: T): Promise<InsertResult>;
}

interface ICrudController<T> {
  post(dto: T): Promise<InsertResult>;
}

export function CrudController(service: ICrudService<any>): Type<ICrudController<any>> {
  class CrudControllerHost {
    @Inject(service) private readonly crudService;

    @Post()
    async post(@Body() createDto) {
      return this.crudService.post(createDto);
    }
  }

  return CrudControllerHost;
}
