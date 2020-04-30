import { Test, TestingModule } from '@nestjs/testing';
import { StudiosService } from './studios.service';
import { SearchStudio } from './providers/search-studio';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Studio } from './studios.entity';
import { StudiosController } from './studios.controller';
import { createStudio } from '../shared/test-utils/create-test-studios';
import { QueryFailedError } from 'typeorm';

describe('StudioController', () => {
  let studioService: StudiosService;
  let studiosController: StudiosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: StudiosService,
          useValue: {
            findManyStudioOrchestration: () => {
              return null;
            },
            findOneOrchestration: () => {
              return null;
            },
            postOrchestration: () => {
              return null;
            },
            putOrchestration: () => {
              return null;
            },
            deleteOrchestration: () => {
              return null;
            },
          },
        },
        { provide: getRepositoryToken(Studio), useValue: {} },
        SearchStudio,
      ],
      controllers: [StudiosController],
    }).compile();

    studioService = module.get<StudiosService>(StudiosService);
    studiosController = module.get<StudiosController>(StudiosController);
  });

  it('should be defined', () => {
    expect(studiosController).toBeDefined();
  });

  describe('StudioController.getStudiosController method test', () => {
    it('Call Signature : (SearchStudioDto: {}) : Promise<Studio[]>', async () => {
      const studioArray = [createStudio(1, 'fdlkfdl'), createStudio(2, 'lfdkl')];
      jest.spyOn(studioService, 'findManyStudioOrchestration').mockResolvedValue(studioArray);

      const testCall = studiosController.getStudiosController({});

      expect(testCall).resolves.toMatchObject(studioArray);
    });

    it('Call Signature : (SearchStudioDto: {name:string}) : Promise<Studio[]>', async () => {
      const studioArray = [createStudio(1, 'fldk')];
      jest.spyOn(studioService, 'findManyStudioOrchestration').mockResolvedValue(studioArray);

      expect(studiosController.getStudiosController({ name: 'fldk' })).resolves.toMatchObject(studioArray);
    });

    it('Call Signature : (SearchStudioDto: {id:number}) : Promise<Studio[]>', async () => {
      const studioArray = [createStudio(1, 'fldk')];
      jest.spyOn(studioService, 'findManyStudioOrchestration').mockResolvedValue(studioArray);

      expect(studiosController.getStudiosController({ id: 1 })).resolves.toMatchObject(studioArray);
    });

    it('Call Signature : (SearchStudioDto: {name: string, id:number}) : Promise<Studio[]>', async () => {
      const studioArray = [createStudio(1, 'fldk')];
      jest.spyOn(studioService, 'findManyStudioOrchestration').mockResolvedValue(studioArray);

      expect(studiosController.getStudiosController({ id: 1, name: 'fldk' })).resolves.toMatchObject(studioArray);
    });
  });

  describe('StudioController.getStudioController method test', () => {
    it('Call Signature : (id: number) : Promise<Studio[]>', async () => {
      const studioArray = [createStudio(1, 'fdlkfdl')];
      jest.spyOn(studioService, 'findOneOrchestration').mockResolvedValue(studioArray);

      expect(studiosController.getStudioController(1)).resolves.toMatchObject(studioArray);
    });
  });

  describe('StudioController.postStudioControler method test', () => {
    it('When called with non existing name should return  Promise<{id: number}>', async () => {
      jest.spyOn(studioService, 'postOrchestration').mockResolvedValue({ id: 1 });

      expect(studiosController.postStudioControler({ name: 'fldk' })).resolves.toMatchObject({ id: 1 });
    });

    it('When called with  existing name trow QueryFailedError', async () => {
      jest.spyOn(studioService, 'postOrchestration').mockRejectedValue(new QueryFailedError('fldk', ['dsml'], 'fdlk'));

      expect(studiosController.postStudioControler({ name: 'fldk' })).rejects.toThrow(QueryFailedError);
    });
  });

  describe('StudioController.putStudioController method test', () => {
    it('When called with existing id should return Promise<{id: number}>', async () => {
      jest.spyOn(studioService, 'putOrchestration').mockResolvedValue({ id: 1 });

      expect(studiosController.putStudioController(1, { name: 'fldk' })).resolves.toMatchObject({ id: 1 });
    });

    it('When called with non existing id should return Promise<{id: null}>', async () => {
      jest.spyOn(studioService, 'putOrchestration').mockResolvedValue({ id: null });

      expect(studiosController.putStudioController(1, { name: 'fldk' })).resolves.toMatchObject({ id: null });
    });

    it('When updating with already used name should trow QueryFailedError', async () => {
      jest.spyOn(studioService, 'putOrchestration').mockRejectedValue(new QueryFailedError('fldk', ['dsml'], 'fdlk'));

      expect(studiosController.putStudioController(1, { name: 'fldk' })).rejects.toThrow(QueryFailedError);
    });
  });

  describe('StudioController.deleteStudioController method test', () => {
    it(`When called with existing id should return Promise<'deleted'>`, async () => {
      jest.spyOn(studioService, 'deleteOrchestration').mockResolvedValue('deleted');

      expect(studiosController.deleteStudioController(1)).resolves.toMatch('deleted');
    });

    it(`When called with non existing id should return Promise<'doesn't exist'>`, async () => {
      jest.spyOn(studioService, 'deleteOrchestration').mockResolvedValue(`doesn't exist`);

      expect(studiosController.deleteStudioController(1)).resolves.toMatch(`doesn't exist`);
    });
  });
});
