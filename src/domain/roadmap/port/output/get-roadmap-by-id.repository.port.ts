import { RoadmapDomain } from "../../domain/roadmap.domain";

export interface GetRoadmapByIdRepositoryPort {
  getRoadmapById(id: string): Promise<RoadmapDomain>;
}
