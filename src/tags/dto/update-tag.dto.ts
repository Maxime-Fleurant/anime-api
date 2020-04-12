import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateTagDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  themeId: number;
}
