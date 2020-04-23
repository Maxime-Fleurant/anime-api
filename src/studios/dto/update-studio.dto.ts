import { IsString, IsOptional } from 'class-validator';

export class UpdateStudioDto {
  @IsOptional()
  @IsString()
  name?: string;
}
