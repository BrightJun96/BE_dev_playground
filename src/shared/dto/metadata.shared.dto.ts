import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class MetadataSharedDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "SEO - 제목",
    example: "react 관련...",
  })
  metaTitle: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: "SEO - 설명",
    example: "react 관련 설명입니다.",
  })
  metaDescription: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: "SEO - 이미지 URL",
    example: "https://s3.efsdfs/....",
  })
  metaImageUrl?: string;
}
