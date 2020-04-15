import { Test, TestingModule } from '@nestjs/testing';
import { ExternalLinksController } from './external-links.controller';

describe('ExternalLinks Controller', () => {
  let controller: ExternalLinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalLinksController],
    }).compile();

    controller = module.get<ExternalLinksController>(ExternalLinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
