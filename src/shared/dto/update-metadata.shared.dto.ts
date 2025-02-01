import { PartialType } from "@nestjs/mapped-types";
import { CreateMetadataSharedDto } from "./create-metadata.shared.dto";

export class UpdateMetadataSharedDto extends PartialType(
  CreateMetadataSharedDto,
) {}
