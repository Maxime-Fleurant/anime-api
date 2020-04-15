import { IsString, IsNumber, IsDate, IsArray, IsOptional } from 'class-validator';

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
  @IsOptional()
  xLargeCover: string;

  @IsString()
  @IsOptional()
  largeCover: string;

  @IsString()
  @IsOptional()
  mediumCover: string;

  @IsNumber()
  avgScore: number;

  @IsNumber()
  popularity: number;

  @IsNumber()
  studioId: number;

  @IsString({ each: true })
  tags: string[];

  @IsString({ each: true })
  genres: string[];
}
