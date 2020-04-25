import { Test, TestingModule } from '@nestjs/testing';
import { SearchStudio } from './search-studio';

describe('SearchStudio', () => {
  let provider: SearchStudio;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchStudio],
    }).compile();

    provider = module.get<SearchStudio>(SearchStudio);
  });

  it('should be defined', () => {
    console.log('fdlk');
    expect(provider).toBeDefined();
  });
});
