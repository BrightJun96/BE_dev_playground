import { PartialType } from "@nestjs/mapped-types";
import { CreateInterviewMetadataDto } from "./create-interview-metadata.dto";

export class UpdateInterviewMetadataRequestDto extends PartialType(
  CreateInterviewMetadataDto,
) {}
