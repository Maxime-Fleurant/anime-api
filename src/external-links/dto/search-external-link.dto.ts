import { IsNumber, IsOptional } from 'class-validator';

export class SearchExternalLinkDto {
  @IsNumber()
  @IsOptional()
  animeId?: number;

  @IsNumber()
  @IsOptional()
  id?: number;
}
