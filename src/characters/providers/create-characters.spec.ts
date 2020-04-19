import { Test, TestingModule } from '@nestjs/testing';
import { CreateCharacters } from './create-characters';

describe('CreateCharacters', () => {
  let provider: CreateCharacters;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCharacters],
    }).compile();

    provider = module.get<CreateCharacters>(CreateCharacters);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
