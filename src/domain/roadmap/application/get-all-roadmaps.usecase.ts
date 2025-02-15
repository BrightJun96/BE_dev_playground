import { Inject } from "@nestjs/common";
import { GetAllRoadmapsRepositoryPort } from "../port/output/get-all-roadmaps.repository.port";

export class GetAllRoadmapsUseCase {
  constructor(
    @Inject("GetAllRoadmapsRepositoryPort")
    private readonly getAllRoadmapsRepositoryPort: GetAllRoadmapsRepositoryPort,
  ) {}

  async execute() {
    console.log("GetAllRoadmapsUseCase");
    return await this.getAllRoadmapsRepositoryPort.getAllRoadmaps();
  }
}
