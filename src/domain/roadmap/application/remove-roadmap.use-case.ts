import { Inject } from "@nestjs/common";
import { RemoveRoadmapRepositoryPort } from "../port/output/remove-roadmap.repository.port";

export class RemoveRoadmapUseCase {
  constructor(
    @Inject("RemoveRoadmapRepositoryPort")
    private readonly removeRoadmapRepositoryPort: RemoveRoadmapRepositoryPort,
  ) {}

  async execute(id: string) {
    return await this.removeRoadmapRepositoryPort.remove(
      id,
    );
  }
}
