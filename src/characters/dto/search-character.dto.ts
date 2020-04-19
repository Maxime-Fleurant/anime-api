import { IsString, IsOptional, IsNumber } from 'class-validator';

export class SearchCharacterDto {
  @IsString()
  @IsOptional()
  animeId?: string;

  @IsNumber()
  @IsOptional()
  id?: number;
}
