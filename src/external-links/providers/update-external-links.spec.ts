import { Test, TestingModule } from '@nestjs/testing';
import { UpdateExternalLinks } from './update-external-links';

describe('UpdateExternalLinks', () => {
  let provider: UpdateExternalLinks;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateExternalLinks],
    }).compile();

    provider = module.get<UpdateExternalLinks>(UpdateExternalLinks);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
