import { PartialType } from "@nestjs/mapped-types";
import { MetadataSharedDto } from "./metadata.shared.dto";

export class UpdateMetadataSharedDto extends PartialType(
  MetadataSharedDto,
) {}
