import { Module, Global } from '@nestjs/common';
import { Bcrypt } from './bcrypt';
import { CrudController } from './crud-controller';

@Global()
@Module({
  providers: [Bcrypt],
  exports: [Bcrypt],
})
export class SharedModule {}
