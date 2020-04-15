import { IsNumber, IsOptional } from 'class-validator';

export class SearchReviewDto {
  @IsNumber()
  @IsOptional()
  animeId: number;
}
