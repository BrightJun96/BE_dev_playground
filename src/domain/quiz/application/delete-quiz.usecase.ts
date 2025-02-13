import { Inject } from "@nestjs/common";
import { DeleteQuizRepositoryPort } from "../port/output/delete-quiz.repository.port";

export class DeleteQuizUsecase {
  constructor(
    @Inject("DeleteQuizRepositoryPort")
    private readonly deleteQuizRepositoryPort: DeleteQuizRepositoryPort,
  ) {}

  async execute(id: number) {
    return await this.deleteQuizRepositoryPort.remove(id);
  }
}
