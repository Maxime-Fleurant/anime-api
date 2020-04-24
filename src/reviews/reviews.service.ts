import { Injectable, ForbiddenException } from '@nestjs/common';
import { Review } from './reviews.entity';
import { SearchReviewDto } from './dto/search-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { SearchReviews } from './providers/search-reviews';
import { GenericServiceOrchestratorFactory } from 'src/shared/generic-service-orchestrator';
import { User } from 'src/users/users.entity';

@Injectable()
export class ReviewsService extends GenericServiceOrchestratorFactory<Review, CreateReviewDto, UpdateReviewDto>(
  Review,
) {
  constructor(private searchReviewProvider: SearchReviews) {
    super();
  }

  findAll(searchReviewDto: SearchReviewDto): Promise<Review[]> {
    return this.searchReviewProvider.find(searchReviewDto);
  }

  postReviewOrchestration(createReviewDto: CreateReviewDto, user: User): Promise<object> {
    if (createReviewDto.userId != user.id) throw new ForbiddenException();

    return super.postOrchestration(createReviewDto);
  }

  async putReviewOrchestration(id: number, updateReviewDto: UpdateReviewDto, user: User): Promise<object> {
    const reviewToUpdate = await super.findOneOrchestration(id);

    if (!reviewToUpdate.length || reviewToUpdate[0].userId != user.id) throw new ForbiddenException();

    return super.putOrchestration(id, updateReviewDto);
  }

  async deleteReviewOrchestration(id: number, user: User): Promise<string> {
    const reviewToDelete = await super.findOneOrchestration(id);

    if (!reviewToDelete.length || reviewToDelete[0].userId != user.id) throw new ForbiddenException();

    return super.deleteOrchestration(id);
  }
}
