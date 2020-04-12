import { IsString } from 'class-validator';

export class SearchStudioDto {
  @IsString()
  name: string;
}
