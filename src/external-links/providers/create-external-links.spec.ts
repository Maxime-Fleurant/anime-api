import { Test, TestingModule } from '@nestjs/testing';
import { CreateExternalLinks } from './create-external-links';

describe('CreateExternalLinks', () => {
  let provider: CreateExternalLinks;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateExternalLinks],
    }).compile();

    provider = module.get<CreateExternalLinks>(CreateExternalLinks);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
