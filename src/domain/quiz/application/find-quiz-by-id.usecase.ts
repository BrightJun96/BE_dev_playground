import { Inject } from "@nestjs/common";
import { FindQuizByIdRepositoryPort } from "../port/output/find-quiz-by-id.repository.port";

export class FindQuizByIdUsecase {
  constructor(
    @Inject("FindQuizByIdRepositoryPort")
    private readonly findQuizByIdRepositoryPort: FindQuizByIdRepositoryPort,
  ) {}
  async execute(id: number) {
    return await this.findQuizByIdRepositoryPort.findOneById(
      id,
    );
  }
}
