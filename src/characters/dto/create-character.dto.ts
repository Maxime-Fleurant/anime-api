import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  nativeName: string;

  @IsString()
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
  animeId: number;
}
