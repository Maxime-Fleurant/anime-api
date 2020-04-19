import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCharacters } from './update-characters';

describe('UpdateCharacters', () => {
  let provider: UpdateCharacters;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCharacters],
    }).compile();

    provider = module.get<UpdateCharacters>(UpdateCharacters);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
