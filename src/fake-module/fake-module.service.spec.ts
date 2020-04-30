import { Test, TestingModule } from '@nestjs/testing';
import { FakeModuleService } from './fake-module.service';

describe('FakeModuleService', () => {
  let service: FakeModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakeModuleService],
    }).compile();

    service = module.get<FakeModuleService>(FakeModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
