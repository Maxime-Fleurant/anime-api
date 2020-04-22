import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchReviewDto } from '../dto/search-review.dto';
import { Review } from '../reviews.entity';

@Injectable()
export class SearchReviews {
  constructor(@InjectRepository(Review) private externalLinkRepository: Repository<Review>) {}

  find = async (searchExternalLinkDto: SearchReviewDto): Promise<Review[]> => {
    const { animeId } = searchExternalLinkDto;
    const searchQuery = this.externalLinkRepository.createQueryBuilder('review');

    if (animeId) searchQuery.where(`animeId = :animeId`, { animeId: animeId });

    return searchQuery.getMany();
  };
}
