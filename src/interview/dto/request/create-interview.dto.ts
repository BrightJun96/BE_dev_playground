import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { Field } from "../../../shared/enum/field.enum";
import { CreateInterviewMetadataDto } from "./create-interview-metadata.dto";

export class CreateInterviewDto {
  @IsNotEmpty()
  @IsString()
  title: string; //  제목

  @IsNotEmpty()
  @IsString()
  content: string; //  내용

  @IsNotEmpty()
  @IsString()
  detailUrl: string; // 상세 URL

  @IsNotEmpty()
  @IsEnum(Field)
  field: Field; //  분야

  @ValidateNested()
  @Type(() => CreateInterviewMetadataDto)
  metaData: CreateInterviewMetadataDto; //메타 데이터
}
