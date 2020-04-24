import { Controller, Get, Post, Put, Delete, Query, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './reviews.entity';
import { SearchReviewDto } from './dto/search-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/users.entity';

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

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Req() { user }: { user: User }): Promise<object> {
    return this.reviewService.postReviewOrchestration(createReviewDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Req() { user }: { user: User },
  ): Promise<object> {
    return this.reviewService.putReviewOrchestration(id, updateReviewDto, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: number, @Req() { user }: { user: User }): Promise<string> {
    return this.reviewService.deleteReviewOrchestration(id, user);
  }
}
