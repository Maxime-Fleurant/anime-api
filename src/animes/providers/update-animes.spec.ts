import { Test, TestingModule } from '@nestjs/testing';
import { UpdateAnimes } from './update-animes';

describe('UpdateAnimes', () => {
  let provider: UpdateAnimes;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateAnimes],
    }).compile();

    provider = module.get<UpdateAnimes>(UpdateAnimes);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
