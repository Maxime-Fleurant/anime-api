import { Test, TestingModule } from '@nestjs/testing';
import { FindAnimes } from './find-animes';

describe('FindAnimes', () => {
  let provider: FindAnimes;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FindAnimes],
    }).compile();

    provider = module.get<FindAnimes>(FindAnimes);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
