import { Test, TestingModule } from '@nestjs/testing';
import { StudiosService } from './studios.service';
import { SearchStudio } from './providers/search-studio';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Studio } from './studios.entity';
import { GenericCreate } from '../shared/generic-create';
import { GenericUpdate } from '../shared/generic-update';
import { GenericDelete } from '../shared/generic-delete';
import { GenericSearch } from '../shared/generic-search';
import { createStudio } from '../shared/test-utils/create-test-studios';

describe('StudiosService', () => {
  let studioService: StudiosService;
  let searchStudio: SearchStudio;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SearchStudio,
          useValue: {
            find: () => {
              return null;
            },
          },
        },
        { provide: getRepositoryToken(Studio), useValue: {} },
        StudiosService,
        GenericCreate,
        GenericUpdate,
        GenericDelete,
        GenericSearch,
      ],
    }).compile();

    studioService = module.get<StudiosService>(StudiosService);
    searchStudio = module.get<SearchStudio>(SearchStudio);
  });

  it('should be defined', () => {
    expect(studioService).toBeDefined();
  });

  describe('StudiosService findManyStudioOrchestration method test', () => {
    it('When called with DTO: {} -> return Studio[]', async () => {
      const studioArray = [createStudio(1, 'fdlkfdl'), createStudio(2, 'lfdkl')];
      jest.spyOn(searchStudio, 'find').mockResolvedValue(studioArray);

      expect(studioService.findManyStudioOrchestration({})).resolves.toMatchObject(studioArray);
    });

    it('When called with DTO: {name:value} -> return Studio[]', async () => {
      const studioArray = [createStudio(1, 'fldk')];
      jest.spyOn(searchStudio, 'find').mockResolvedValue(studioArray);

      expect(studioService.findManyStudioOrchestration({ name: 'fldk' })).resolves.toMatchObject(studioArray);
    });

    it('When called with DTO: {id:value} -> return Studio[]', async () => {
      const studioArray = [createStudio(1, 'fldk')];
      jest.spyOn(searchStudio, 'find').mockResolvedValue(studioArray);

      expect(studioService.findManyStudioOrchestration({ id: 1 })).resolves.toMatchObject(studioArray);
    });

    it('When called with DTO: {name:, value, id:value} -> return Studio[]', async () => {
      const studioArray = [createStudio(1, 'fldk')];
      jest.spyOn(searchStudio, 'find').mockResolvedValue(studioArray);

      expect(studioService.findManyStudioOrchestration({ id: 1, name: 'fldk' })).resolves.toMatchObject(studioArray);
    });
  });
});
