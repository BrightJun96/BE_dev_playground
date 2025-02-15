import { Inject } from "@nestjs/common";
import { GetRoadmapByTitleRepositoryPort } from "../port/output/get-roadmap-by-title.repository.port";

export class GetRoadmapByTitleUseCase {
  constructor(
    @Inject("GetRoadmapByTitleRepositoryPort")
    private readonly getRoadmapByTitleRepositoryPort: GetRoadmapByTitleRepositoryPort,
  ) {}

  async execute(title: string) {
    return await this.getRoadmapByTitleRepositoryPort.getRoadmapByTitle(
      title,
    );
  }
}
