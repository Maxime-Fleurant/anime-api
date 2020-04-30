import { Test, TestingModule } from '@nestjs/testing';
import { SearchStudio } from './search-studio';
import { Anime } from '../../animes/animes.entity';
import { Studio } from '../studios.entity';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Theme } from '../../themes/themes.entity';
import { Genre } from '../../genres/genres.entity';
import { Tag } from '../../tags/tags.entity';
import { Review } from '../../reviews/reviews.entity';
import { Character } from '../../characters/character.entity';
import { ExternalLink } from '../../external-links/external-links.entity';
import { User } from '../../users/users.entity';
import { Repository } from 'typeorm';

describe('SearchStudio', () => {
  let service: SearchStudio;
  let module: TestingModule;
  let studioRepository: Repository<Studio>;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5431,
          username: 'anidbtest',
          password: 'test123',
          database: 'anidbtest',
          entities: [Studio, Theme, Genre, Tag, Anime, Review, Character, ExternalLink, User],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Studio]),
      ],
      providers: [SearchStudio],
    }).compile();

    service = module.get<SearchStudio>(SearchStudio);
    studioRepository = module.get<Repository<Studio>>(getRepositoryToken(Studio));
  });

  afterEach(async () => {
    await studioRepository.query('DELETE FROM studio');
    module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('SearchStudio.find test', () => {
    it('When called with no arguments should return an array of all existing studio', async () => {
      const testStudio = new Studio();
      const testStudio2 = new Studio();
      testStudio.name = 'test';
      testStudio2.name = 'test2';

      await studioRepository.save([testStudio, testStudio2]);

      const testCall = await service.find({});

      expect(testCall).toMatchObject([testStudio, testStudio2]);
    });

    it('When called with id arguments of existing row should return an array containing the corresponding row', async () => {
      const testStudio = new Studio();
      testStudio.name = 'test';

      const savedStudio = await studioRepository.save(testStudio);

      const testCall = await service.find({ id: savedStudio.id });

      expect(testCall).toMatchObject([testStudio]);
    });

    it('When called with name arguments of existing row should return an array containing the corresponding row', async () => {
      const testStudio = new Studio();
      testStudio.name = 'test';

      const savedStudio = await studioRepository.save(testStudio);

      const testCall = await service.find({ name: savedStudio.name });

      expect(testCall).toMatchObject([testStudio]);
    });

    it('When called with id arguments of non-existing row should return an empty array', async () => {
      const testStudio = new Studio();
      testStudio.name = 'test';

      const savedStudio = await studioRepository.save(testStudio);

      const testCall = await service.find({ id: 4000 });

      expect(testCall).toMatchObject([]);
    });

    it('When called with name arguments of non-existing row should return an empty array', async () => {
      const testStudio = new Studio();
      testStudio.name = 'test';

      const savedStudio = await studioRepository.save(testStudio);

      const testCall = await service.find({ name: 'fdlk' });

      expect(testCall).toMatchObject([]);
    });
  });
});
