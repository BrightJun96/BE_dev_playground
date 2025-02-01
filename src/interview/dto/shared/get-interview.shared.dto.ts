import { ApiProperty } from "@nestjs/swagger";
import { Field } from "../../../shared/enum/field.enum";
import { GetInterviewMetadataSharedDto } from "./get-interview-metadata.shared.dto";

export class GetInterviewSharedDto {
  @ApiProperty({
    description: "PK",
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: "제목",
    example: "react를 왜 사용하는지 설명하세요.",
  })
  title: string;

  @ApiProperty({
    description: "내용",
    example: "react는 SPA 프레임워크로서 컴포넌트 기반..",
  })
  content: string;

  @ApiProperty({
    description: "상세 URL",
    example: "react",
  })
  detailUrl: string;

  @ApiProperty({
    description: "분야",
    example: "FRONTEND",
  })
  field: Field; //

  @ApiProperty({
    description: "SEO 관련 사용될 데이터",
  })
  metaData: GetInterviewMetadataSharedDto;
}
