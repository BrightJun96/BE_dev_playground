import { PartialType } from "@nestjs/swagger";
import { CreateConceptRequestDto } from "./create-concept.request.dto";

export class UpdateConceptRequestDto extends PartialType(
  CreateConceptRequestDto,
) {}
