import { QuizDomain } from "../../domain/quiz.domain";

export interface CreateQuizRepositoryPort {
  findOneByUrl(url: string): Promise<void>;
  save(quizDomain: QuizDomain): Promise<QuizDomain>;
}
