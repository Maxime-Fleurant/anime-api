import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewService: ReviewsService) {}

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne() {
    return this.reviewService.findOne();
  }

  @Post()
  create() {
    return this.reviewService.create();
  }

  @Put()
  update() {
    return this.reviewService.update();
  }

  @Delete()
  delete() {
    return this.reviewService.delete();
  }
}
