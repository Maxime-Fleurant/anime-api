import { Injectable } from '@nestjs/common';
import { Studio } from './studios.entity';
import { CreateStudioDto } from './dto/create-studio.dto';
import { SearchStudioDto } from './dto/search-studio.dto';
import { UpdateStudioDto } from './dto/update-studio.dto';
import { SearchStudio } from './providers/search-studio';
import { GenericServiceOrchestratorFactory } from '../shared/generic-service-orchestrator';

@Injectable()
export class StudiosService extends GenericServiceOrchestratorFactory<Studio, CreateStudioDto, UpdateStudioDto>(
  Studio,
) {
  constructor(private searchStudioService: SearchStudio) {
    super();
  }

  findManyStudioOrchestration(searchstudiodto: SearchStudioDto): Promise<Studio[]> {
    return this.searchStudioService.find(searchstudiodto);
  }
}
