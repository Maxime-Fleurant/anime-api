import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class SearchAnimeDto {
  @IsString()
  @IsOptional()
  romajiTitle: string;

  @IsString()
  @IsOptional()
  englishTitle: string;

  @IsString()
  @IsOptional()
  nativeTitle: string;

  @IsNumber()
  @IsOptional()
  avgScore: number;

  @IsNumber()
  @IsOptional()
  popularity: number;

  @IsNumber()
  @IsOptional()
  studioId: number;

  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @IsArray()
  @IsOptional()
  genres: string[];
}
