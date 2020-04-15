import { IsString, IsOptional } from 'class-validator';

export class SearchCharacterDto {
  @IsString()
  @IsOptional()
  animeId: string;
}
