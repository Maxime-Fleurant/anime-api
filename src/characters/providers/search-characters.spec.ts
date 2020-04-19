import { Test, TestingModule } from '@nestjs/testing';
import { SearchCharacters } from './search-characters';

describe('SearchCharacters', () => {
  let provider: SearchCharacters;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchCharacters],
    }).compile();

    provider = module.get<SearchCharacters>(SearchCharacters);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
