import { IsString, IsOptional } from 'class-validator';

export class SearchStudioDto {
  @IsOptional()
  @IsString()
  name: string;
}
