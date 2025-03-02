import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { MetadataSharedDto } from "../../../../shared/dto/metadata.shared.dto";
import { Field } from "../../../../shared/enum/field.enum";
import { Tech } from "../../../../shared/enum/tech.enum";

export class CreateConceptRequestDto {
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

  @IsNotEmpty()
  @IsEnum(Tech)
  tech: Tech; //  분야

  @ValidateNested()
  @Type(() => MetadataSharedDto)
  metaData: MetadataSharedDto; // 메타데이터
}
