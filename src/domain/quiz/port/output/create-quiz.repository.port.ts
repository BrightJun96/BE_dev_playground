import { QuizDomain } from "../../domain/quiz.domain";

export interface CreateQuizRepositoryPort {
  findOneByUrl(url: string): Promise<QuizDomain>;
  save(quizDomain: QuizDomain): Promise<QuizDomain>;
}
