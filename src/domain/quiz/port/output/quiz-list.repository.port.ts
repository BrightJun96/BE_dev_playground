import { QuizDomain } from "../../domain/quiz.domain";
import { GetQuizListRequestDto } from "../../dto/request/get-quiz-list.request.dto";

export interface QuizListRepositoryPort {
  findAll(query: GetQuizListRequestDto): Promise<{
    data: QuizDomain[];
    count: number;
    nextCursor?: string;
  }>;
}
