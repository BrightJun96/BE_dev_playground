import { RoadmapDomain } from "../../domain/roadmap.domain";

export interface RemoveRoadmapRepositoryPort {
  remove(id: string): Promise<RoadmapDomain>;
}
