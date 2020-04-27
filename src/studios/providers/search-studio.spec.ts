import { Test, TestingModule } from '@nestjs/testing';
import { SearchStudio } from './search-studio';
import { Studio } from '../studios.entity';
import { SelectQueryBuilder } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

class TestRepo {
  createQueryBuilder: () => SelectQueryBuilder<Studio>;
}

const createStudio = (id: number, name: string): Studio => {
  const newStudio = new Studio();

  newStudio.id = id;
  newStudio.name = name;

  return newStudio;
};

describe('SearchStudio', () => {
  let searchStudio: SearchStudio;
  let selectQueryBuilder: SelectQueryBuilder<Studio>;
  let testRepo: TestRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchStudio,
        { provide: getRepositoryToken(Studio), useClass: TestRepo },
        { provide: 'selectQueryBuilder', useClass: SelectQueryBuilder },
      ],
    }).compile();

    searchStudio = module.get<SearchStudio>(SearchStudio);
    testRepo = module.get<TestRepo>(getRepositoryToken(Studio));
    selectQueryBuilder = module.get<SelectQueryBuilder<Studio>>('selectQueryBuilder');

    testRepo.createQueryBuilder = () => selectQueryBuilder;
  });

  it('should be defined', () => {
    expect(searchStudio).toBeDefined();
  });

  describe('SearchStudio Find Method Test', () => {
    it('When called with DTO: {} -> return Studio[]', async () => {
      const studioArray = [createStudio(1, 'fdlkfdl'), createStudio(2, 'lfdkl')];
      jest.spyOn(selectQueryBuilder, 'getMany').mockResolvedValue(studioArray);

      expect(searchStudio.find({})).resolves.toMatchObject(studioArray);
    });

    it('When called with DTO: {name:value} -> return Studio[]', async () => {
      const studioArray = [createStudio(1, 'fldk')];
      jest.spyOn(selectQueryBuilder, 'getMany').mockResolvedValue(studioArray);

      expect(searchStudio.find({ name: 'fldk' })).resolves.toMatchObject(studioArray);
    });

    it('When called with DTO: {id:value} -> return Studio[]', async () => {
      const studioArray = [createStudio(1, 'fldk')];
      jest.spyOn(selectQueryBuilder, 'getMany').mockResolvedValue(studioArray);

      expect(searchStudio.find({ id: 1 })).resolves.toMatchObject(studioArray);
    });

    it('When called with DTO: {name:, value, id:value} -> return Studio[]', async () => {
      const studioArray = [createStudio(1, 'fldk')];
      jest.spyOn(selectQueryBuilder, 'getMany').mockResolvedValue(studioArray);

      expect(searchStudio.find({ id: 1, name: 'fldk' })).resolves.toMatchObject(studioArray);
    });
  });
});
