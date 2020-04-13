import { IsString, IsNumber, IsDate, IsArray } from 'class-validator';

export class CreateAnimeDto {
  @IsString()
  romajiTitle: string;

  @IsString()
  englishTitle: string;

  @IsString()
  nativeTitle: string;

  @IsString()
  description: string;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsNumber()
  nbEpisodes: number;

  @IsString()
  trailer: string;

  @IsString()
  xLargeCover: string;

  @IsString()
  largeCover: string;

  @IsString()
  mediumCover: string;

  @IsNumber()
  avgScore: number;

  @IsNumber()
  popularity: number;

  @IsNumber()
  studioId: number;

  @IsArray()
  tags: number[];
}
