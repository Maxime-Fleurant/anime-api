import { IsString, IsNumber } from 'class-validator';

export class CreateTagDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  themeId: number;
}
