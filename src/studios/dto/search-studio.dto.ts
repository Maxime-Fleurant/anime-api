import { IsString, IsOptional, IsNumber } from 'class-validator';

export class SearchStudioDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  id?: number;
}
