import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  score: number;

  @IsString()
  summary: string;

  @IsString()
  body: string;

  @IsNumber()
  animeId: number;

  @IsNumber()
  userId: number;
}
