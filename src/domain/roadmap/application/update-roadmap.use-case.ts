import { Inject } from "@nestjs/common";
import { UpdateRoadmapRequestDto } from "../dto/update-roadmap.request.dto";
import { UpdateRoadmapRepositoryPort } from "../port/output/update-roadmap.repository.port";

export class UpdateRoadmapUseCase {
  constructor(
    @Inject("UpdateRoadmapRepositoryPort")
    private readonly updateRoadmapRepositoryPort: UpdateRoadmapRepositoryPort,
  ) {}

  async execute(
    id: string,
    updateRoadmapRequestDto: UpdateRoadmapRequestDto,
  ) {
    return await this.updateRoadmapRepositoryPort.update(
      id,
      updateRoadmapRequestDto,
    );
  }
}
