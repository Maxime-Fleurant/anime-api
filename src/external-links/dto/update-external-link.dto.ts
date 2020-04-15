import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateExternalLinkDto {
  @IsString()
  @IsOptional()
  site: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsNumber()
  @IsOptional()
  animeId: number;
}
