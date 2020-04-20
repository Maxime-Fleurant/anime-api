import { Test, TestingModule } from '@nestjs/testing';
import { SearchExternalLinks } from './search-external-links';

describe('SearchExternalLinks', () => {
  let provider: SearchExternalLinks;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchExternalLinks],
    }).compile();

    provider = module.get<SearchExternalLinks>(SearchExternalLinks);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
