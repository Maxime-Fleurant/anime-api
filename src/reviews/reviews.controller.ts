import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './reviews.entity';
import { SearchReviewDto } from './dto/search-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Get()
  findAll(@Query() searchReviewDto: SearchReviewDto): Promise<Review[]> {
    return this.reviewService.findAll(searchReviewDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Review[]> {
    return this.reviewService.findOneOrchestration(id);
  }

  @Post()
  create(@Body() createReviewDto: CreateReviewDto): Promise<object> {
    return this.reviewService.postOrchestration(createReviewDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto): Promise<object> {
    return this.reviewService.putOrchestration(id, updateReviewDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<string> {
    return this.reviewService.deleteOrchestration(id);
  }
}
