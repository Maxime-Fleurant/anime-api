import { Test, TestingModule } from '@nestjs/testing';
import { SearchStudio } from './search-studio';
import { Studio } from '../studios.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('SearchStudio', () => {
  let provider: SearchStudio;
  let repo: Repository<Studio>;
  let sqb: SelectQueryBuilder<Studio>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchStudio,
        { provide: getRepositoryToken(Studio), useClass: Repository },
        { provide: 'test', useClass: SelectQueryBuilder },
      ],
    }).compile();

    provider = module.get<SearchStudio>(SearchStudio);
    repo = module.get<Repository<Studio>>(getRepositoryToken(Studio));
    sqb = module.get<SelectQueryBuilder<Studio>>('test');
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('test', async () => {
    jest.spyOn(repo, 'createQueryBuilder').mockImplementation(() => sqb);
    jest.spyOn(sqb, 'getMany').mockImplementation(() => {
      return Promise.resolve([{ id: 2, name: 'fldk' }]);
    });
    expect(provider).toBeDefined();
    expect(await provider.find({})).toMatchObject([{ id: 2, name: 'fldk' }]);
    provider.find({});
  });
});
