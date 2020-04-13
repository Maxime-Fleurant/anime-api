import { IsNumber, IsString, IsOptional } from 'class-validator';

export class SearchTagDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  themeId?: number;
}
