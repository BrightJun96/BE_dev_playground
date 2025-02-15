import { RoadmapDomain } from "../../domain/roadmap.domain";
import { UpdateRoadmapRequestDto } from "../../dto/update-roadmap.request.dto";

export interface UpdateRoadmapRepositoryPort {
  update(
    id: string,
    updateRoadmapRequestDto: UpdateRoadmapRequestDto,
  ): Promise<RoadmapDomain>;
}
