import { ApiProperty } from "@nestjs/swagger";
import { MetadataSharedDto } from "../../../../shared/dto/metadata.shared.dto";
import { Field } from "../../../../shared/enum/field.enum";
import { Tech } from "../../../../shared/enum/tech.enum";

export class GetConceptSharedDto {
  @ApiProperty({
    description: "PK",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "문제",
    example: "다음은 react 관련 문제입니다.",
  })
  title: string;

  @ApiProperty({
    description: "내용",
    example: "react는 SPA 프레임워크입니다..",
  })
  content: string;

  @ApiProperty({
    description: "상세 URL",
    example: "react",
  })
  detailUrl: string;

  @ApiProperty({
    description: "퀴즈 분야",
    example: "FRONTEND",
  })
  field: Field;

  @ApiProperty({
    description: "기술",
    example: "REACTJS",
  })
  tech: Tech;

  @ApiProperty({
    description: "SEO 관련  데이터",
  })
  conceptMeta: MetadataSharedDto;
}
