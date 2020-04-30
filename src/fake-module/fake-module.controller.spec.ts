import { Test, TestingModule } from '@nestjs/testing';
import { FakeModuleController } from './fake-module.controller';

describe('FakeModule Controller', () => {
  let controller: FakeModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FakeModuleController],
    }).compile();

    controller = module.get<FakeModuleController>(FakeModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
