import { Inject } from "@nestjs/common";
import { CheckAnswerRequestDto } from "../dto/request/check-answer.request.dto";
import { CheckAnswerRepositoryPort } from "../port/output/check-answer.repository.port";

export class CheckAnswerUsecase {
  constructor(
    @Inject("CheckAnswerRepositoryPort")
    private readonly checkAnswerRepositoryPort: CheckAnswerRepositoryPort,
  ) {}

  async execute(dto: CheckAnswerRequestDto) {
    return await this.checkAnswerRepositoryPort.checkAnswer(
      dto,
    );
  }
}
