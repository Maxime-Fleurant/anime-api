import { Injectable } from '@nestjs/common';
import { Review } from './reviews.entity';
import { SearchReviewDto } from './dto/search-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { SearchReviews } from './providers/search-reviews';
import { GenericServiceOrchestratorFactory } from 'src/shared/generic-service-orchestrator';

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
}
