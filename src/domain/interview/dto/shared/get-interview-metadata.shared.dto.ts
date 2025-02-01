import { ApiProperty } from "@nestjs/swagger";

export class GetInterviewMetadataSharedDto {
  @ApiProperty({
    description: "PK",
    example: "1",
  })
  id: number;

  @ApiProperty({
    description: "SEO 메타 제목",
    example: "react",
  })
  metaTitle: string; //

  @ApiProperty({
    description: "SEO 메타 설명",
    example: "react 관련 면접 내용",
  })
  metaDescription: string;

  @ApiProperty({
    description: "SEO 퀴즈 이미지",
    example: "https://s3.sdfsfsdfsdfds.com",
  })
  metaImageUrl?: string;
}
