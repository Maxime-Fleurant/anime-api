import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateCharacterDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  nativeName: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  nativeImage: string;

  @IsString()
  @IsOptional()
  largeImage: string;

  @IsString()
  @IsOptional()
  mediumImage: string;

  @IsNumber()
  @IsOptional()
  animeId: number;
}
