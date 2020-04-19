import { Test, TestingModule } from '@nestjs/testing';
import { DeleteCharacters } from './delete-characters';

describe('DeleteCharacters', () => {
  let provider: DeleteCharacters;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteCharacters],
    }).compile();

    provider = module.get<DeleteCharacters>(DeleteCharacters);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
