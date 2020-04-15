import { Test, TestingModule } from '@nestjs/testing';
import { ExternalLinksService } from './external-links.service';

describe('ExternalLinksService', () => {
  let service: ExternalLinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalLinksService],
    }).compile();

    service = module.get<ExternalLinksService>(ExternalLinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
