import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";
import { Field } from "../../../../shared/enum/field.enum";
import { Tech } from "../../../../shared/enum/tech.enum";

export class GetConceptListRequestDto {
  @ApiPropertyOptional({
    description: "분야 필터",
    enum: Field,
  })
  @IsEnum(Field)
  @IsOptional()
  field: Field;

  @ApiPropertyOptional({
    description: "기술 필터",
    enum: Tech,
  })
  @IsEnum(Tech)
  @IsOptional()
  tech: Tech;
}
