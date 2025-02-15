import { CreateRoadmapRequestDto } from "../../dto/create-roadmap.request.dto";
import { UpdateRoadmapRequestDto } from "../../dto/update-roadmap.request.dto";

export interface RoadmapUseCasePort {
  createRoadmap(
    createRoadmapRequestDto: CreateRoadmapRequestDto,
  ): Promise<unknown>;

  update(
    id: string,
    updateRoadmapRequestDto: UpdateRoadmapRequestDto,
  ): Promise<unknown>;

  getRoadmapById(id: string): Promise<unknown>;

  getRoadmapByTitle(title: string): Promise<unknown>;

  getAllRoadmaps(): Promise<unknown>;

  remove(id: string): Promise<unknown>;
}
