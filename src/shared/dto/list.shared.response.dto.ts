import { ApiProperty } from "@nestjs/swagger";

export class ListSharedResponseDto<T> {
  @ApiProperty({
    description: "데이터 목록",
  })
  data: T[];
  @ApiProperty({
    description: "데이터 갯수",
    example: 10,
  })
  count: number;
  @ApiProperty({
    description: "다음 요청할 커서",
    example:
      "eyJ2YWx1ZXMiOnsiaWQiOjR9LCJvcmRlcnMiOlsiaWRfREVTQyJdfQ==",
  })
  nextCursor: string;
}
