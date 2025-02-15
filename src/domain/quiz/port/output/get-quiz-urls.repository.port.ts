import { QuizDetailURLResponseDto } from "../../dto/response/get-quiz-url.response.dto";

export interface GetQuizUrlsRepositoryPort {
  findDetailUrls(): Promise<QuizDetailURLResponseDto[]>;
}
