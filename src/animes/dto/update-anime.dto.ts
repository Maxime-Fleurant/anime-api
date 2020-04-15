import { IsString, IsDate, IsNumber, IsOptional } from 'class-validator';

export class UpdateAnimeDto {
  @IsString()
  @IsOptional()
  romajiTitle: string;

  @IsString()
  @IsOptional()
  englishTitle: string;

  @IsString()
  @IsOptional()
  nativeTitle: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsNumber()
  @IsOptional()
  nbEpisodes: number;

  @IsString()
  @IsOptional()
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
  addTags: string[];

  @IsString({ each: true })
  @IsOptional()
  removeTags: string[];

  @IsString({ each: true })
  @IsOptional()
  addGenres: string[];

  @IsString({ each: true })
  @IsOptional()
  removeGenres: string[];
}
