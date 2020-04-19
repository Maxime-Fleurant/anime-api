import { Test, TestingModule } from '@nestjs/testing';
import { CreateAnimes } from './create-animes';

describe('CreateAnimes', () => {
  let provider: CreateAnimes;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateAnimes],
    }).compile();

    provider = module.get<CreateAnimes>(CreateAnimes);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
