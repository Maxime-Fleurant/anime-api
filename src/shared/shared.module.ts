import { Module, Global } from '@nestjs/common';
import { Bcrypt } from './bcrypt';

@Global()
@Module({
  providers: [Bcrypt],
  exports: [Bcrypt],
})
export class SharedModule {}
