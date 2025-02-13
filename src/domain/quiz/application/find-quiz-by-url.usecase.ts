import { Inject } from "@nestjs/common";
import { FindQuizByUrlRepositoryPort } from "../port/output/find-quiz-by-url.repository.port";

export class FindQuizByUrlUsecase {
  constructor(
    @Inject("FindQuizByUrlRepositoryPort")
    private readonly findQuizByUrlRepositoryPort: FindQuizByUrlRepositoryPort,
  ) {}
  async execute(url: string) {
    return await this.findQuizByUrlRepositoryPort.findOneByUrl(
      url,
    );
  }
}
