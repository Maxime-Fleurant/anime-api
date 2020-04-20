import { Test, TestingModule } from '@nestjs/testing';
import { DeleteExternalLinks } from './delete-external-links';

describe('DeleteExternalLinks', () => {
  let provider: DeleteExternalLinks;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteExternalLinks],
    }).compile();

    provider = module.get<DeleteExternalLinks>(DeleteExternalLinks);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
