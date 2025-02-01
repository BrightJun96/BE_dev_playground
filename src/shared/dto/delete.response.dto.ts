import { ApiProperty } from "@nestjs/swagger";

export class DeleteResponseDto {
  @ApiProperty({
    description: "삭제 상태",
    example: true,
  })
  removeStatus: boolean;
}
