import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAnimes } from './delete-animes';

describe('DeleteAnimes', () => {
  let provider: DeleteAnimes;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteAnimes],
    }).compile();

    provider = module.get<DeleteAnimes>(DeleteAnimes);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
