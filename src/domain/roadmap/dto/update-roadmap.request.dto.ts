import { PartialType } from "@nestjs/swagger";
import { CreateRoadmapRequestDto } from "./create-roadmap.request.dto";

export class UpdateRoadmapRequestDto extends PartialType(
  CreateRoadmapRequestDto,
) {}
