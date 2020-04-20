import { Test, TestingModule } from '@nestjs/testing';
import { CrudController } from './crud-controller';

describe('CrudController', () => {
  let provider: CrudController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrudController],
    }).compile();

    provider = module.get<CrudController>(CrudController);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
