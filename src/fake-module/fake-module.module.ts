import { Module } from '@nestjs/common';
import { FakeModuleController } from './fake-module.controller';
import { FakeModuleService } from './fake-module.service';

@Module({
  controllers: [FakeModuleController],
  providers: [FakeModuleService]
})
export class FakeModuleModule {}
