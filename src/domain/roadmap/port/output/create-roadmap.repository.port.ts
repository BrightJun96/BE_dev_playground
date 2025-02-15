import { RoadmapDomain } from "../../domain/roadmap.domain";
import { CreateRoadmapRequestDto } from "../../dto/create-roadmap.request.dto";

export interface CreateRoadmapRepositoryPort {
  createRoadmap(
    createRoadmapRequestDto: CreateRoadmapRequestDto,
  ): Promise<RoadmapDomain>;
}
