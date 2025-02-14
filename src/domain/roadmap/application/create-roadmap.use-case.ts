import { Inject } from "@nestjs/common";
import { CreateRoadmapRequestDto } from "../dto/create-roadmap.request.dto";
import { CreateRoadmapRepositoryPort } from "../port/output/create-roadmap.repository.port";

export class CreateRoadmapUseCase {
  constructor(
    @Inject("CreateRoadmapRepositoryPort")
    private readonly createRoadmapRepositoryPort: CreateRoadmapRepositoryPort,
  ) {}

  async execute(
    createRoadmapRequestDto: CreateRoadmapRequestDto,
  ) {
    return await this.createRoadmapRepositoryPort.createRoadmap(
      createRoadmapRequestDto,
    );
  }
}
