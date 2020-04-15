import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { Repository } from 'typeorm';
import { SearchReviewDto } from './dto/search-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(Review) private reviewRepository: Repository<Review>) {}

  findAll(searchReviewDto: SearchReviewDto): Promise<Review[]> {
    const { animeId } = searchReviewDto;
    const searchQuery = this.reviewRepository.createQueryBuilder('review');

    if (animeId) searchQuery.where(`review.animeId = :animeId`, { animeId: animeId });

    return searchQuery.getMany();
  }

  findOne(id: string): Promise<Review> {
    return this.reviewRepository
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.anime', 'animes')
      .where('review.id = :id', { id: id })
      .getOne();
  }

  async create(createReviewDto: CreateReviewDto): Promise<object> {
    const createQuery = await this.reviewRepository
      .createQueryBuilder()
      .insert()
      .values(createReviewDto)
      .execute();

    return { id: createQuery.identifiers[0].id };
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<object> {
    await this.reviewRepository
      .createQueryBuilder()
      .update()
      .where(`id = :id`, { id: id })
      .set(updateReviewDto)
      .execute();

    return { id: id };
  }

  async delete(id: string): Promise<string> {
    await this.reviewRepository
      .createQueryBuilder()
      .delete()
      .where(`id = :id`, { id: id })
      .execute();

    return 'deleted';
  }
}
