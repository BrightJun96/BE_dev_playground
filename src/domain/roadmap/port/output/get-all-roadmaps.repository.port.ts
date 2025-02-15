import { RoadmapDomain } from "../../domain/roadmap.domain";

export interface GetAllRoadmapsRepositoryPort {
  getAllRoadmaps(): Promise<RoadmapDomain[]>;
}
