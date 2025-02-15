import { RoadmapDomain } from "../../domain/roadmap.domain";

export interface GetRoadmapByTitleRepositoryPort {
  getRoadmapByTitle(title: string): Promise<RoadmapDomain>;
}
