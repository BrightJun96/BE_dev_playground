import { QuizDomain } from "../domain/quiz.domain";
import { CreateMultipleChoiceRequestDto } from "../dto/request/create-multiple-choice.request.dto";
import { CreateQuizMetaDataDtoRequest } from "../dto/request/create-quiz-meta-data.dto.request";
import { CreateQuizRequestDto } from "../dto/request/create-quiz.request.dto";

export interface CreateQuizRepositoryPort {
  findOneById(id: number): Promise<QuizDomain | null>;
  findOneByUrl(url: string): Promise<QuizDomain | null>;
  createQuizMetaData(
    metaData: CreateQuizMetaDataDtoRequest,
  ): Promise<unknown>;
  createQuiz(
    createQuizRequestDto: CreateQuizRequestDto,
  ): Promise<QuizDomain>;
  createMultipleChoices(
    multipleChoicesDto: CreateMultipleChoiceRequestDto[],
  ): Promise<unknown>;
}
