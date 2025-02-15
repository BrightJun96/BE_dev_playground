import { Inject } from "@nestjs/common";
import { QuizDetailURLResponseDto } from "../dto/response/get-quiz-url.response.dto";
import { GetQuizUrlsRepositoryPort } from "../port/output/get-quiz-urls.repository.port";

export class GetQuizUrlsUsecase {
  constructor(
    @Inject("GetQuizUrlsRepositoryPort")
    private readonly getQuizUrlsRepositoryPort: GetQuizUrlsRepositoryPort,
  ) {}

  async execute(): Promise<QuizDetailURLResponseDto[]> {
    return await this.getQuizUrlsRepositoryPort.findDetailUrls();
  }
}
