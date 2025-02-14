import { Inject } from "@nestjs/common";
import { GetRoadmapByIdRepositoryPort } from "../port/output/get-roadmap-by-id.repository.port";

export class GetRoadmapByIdUseCase {
  constructor(
    @Inject("GetRoadmapByIdRepositoryPort")
    private readonly getRoadmapByIdRepositoryPort: GetRoadmapByIdRepositoryPort,
  ) {}

  async execute(id: string) {
    return this.getRoadmapByIdRepositoryPort.getRoadmapById(
      id,
    );
  }
}
