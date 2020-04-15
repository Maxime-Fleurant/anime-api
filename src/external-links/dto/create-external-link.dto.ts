import { IsNumber, IsString } from 'class-validator';

export class CreateExternalLinkDto {
  @IsString()
  site: string;

  @IsString()
  url: string;

  @IsNumber()
  animeId: number;
}
