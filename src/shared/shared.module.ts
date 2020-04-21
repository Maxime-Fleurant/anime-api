import { Module, Global } from '@nestjs/common';
import { Bcrypt } from './bcrypt';
import { GenericCreate } from './generic-create';
import { GenericUpdate } from './generic-update';
import { GenericDelete } from './generic-delete';
import { GenericSearch } from './generic-search';

@Global()
@Module({
  providers: [Bcrypt, GenericCreate, GenericUpdate, GenericDelete, GenericSearch],
  exports: [Bcrypt, GenericCreate, GenericUpdate, GenericDelete, GenericSearch],
})
export class SharedModule {}
