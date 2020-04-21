import { Repository } from 'typeorm';
import { Inject, Type } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCreate } from './generic-create';
import { GenericUpdate } from './generic-update';
import { GenericDelete } from './generic-delete';
import { GenericSearch } from './generic-search';

export interface IGenericServiceOrchestrator<REPO, CREATE_DTO, UPDATE_DTO> {
  findOneOrchestration: (id: number) => Promise<REPO[]>;
  postOrchestration: (dto: CREATE_DTO) => Promise<object>;
  putOrchestration: (id: number, dto: UPDATE_DTO) => Promise<object>;
  deleteOrchestration: (id: number) => Promise<string>;
}

export type TGenericServiceOrchestratorFactory = <REPO, CREATE_DTO, UPDATE_DTO>(
  repository: Type<REPO>,
) => Type<IGenericServiceOrchestrator<REPO, CREATE_DTO, UPDATE_DTO>>;

export const GenericServiceOrchestratorFactory: TGenericServiceOrchestratorFactory = repository => {
  class GenericServiceOrchestrator<REPO, CREATE_DTO, UPDATE_DTO> {
    @InjectRepository(repository) private repository: Repository<REPO>;

    @Inject() private createService: GenericCreate<REPO, CREATE_DTO>;
    @Inject() private updateService: GenericUpdate<REPO, UPDATE_DTO>;
    @Inject() private deleteService: GenericDelete<REPO>;
    @Inject() private searchService: GenericSearch<REPO>;

    async postOrchestration(createDto) {
      return this.createService.create(this.repository, createDto);
    }

    async putOrchestration(id, updateDto) {
      return this.updateService.update(this.repository, id, updateDto);
    }

    async deleteOrchestration(id) {
      return this.deleteService.delete(this.repository, id);
    }

    findOneOrchestration(id: number): Promise<REPO[]> {
      return this.searchService.find(this.repository, id);
    }
  }

  return GenericServiceOrchestrator;
};
