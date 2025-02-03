import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateRoadmapRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  parentId?: string;
}
