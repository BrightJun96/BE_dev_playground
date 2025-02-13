import { QuizMetaDataDomain } from "../domain/quiz-meta-data.domain";
import { QuizDomain } from "../domain/quiz.domain";
import { CreateMultipleChoiceRequestDto } from "../dto/request/create-multiple-choice.request.dto";
import { CreateQuizMetaDataDtoRequest } from "../dto/request/create-quiz-meta-data.dto.request";
import { CreateQuizRequestDto } from "../dto/request/create-quiz.request.dto";

export interface CreateQuizRepositoryPort {
  findOneById(id: number): Promise<QuizDomain>;
  findOneByUrl(url: string): Promise<QuizDomain | null>;
  createQuizMetaData(
    metaData: CreateQuizMetaDataDtoRequest,
  ): Promise<QuizMetaDataDomain>;
  createQuiz(
    createQuizRequestDto: CreateQuizRequestDto,
    createdQuizMetaId: number,
  ): Promise<QuizDomain>;
  createMultipleChoices(
    multipleChoicesDto: CreateMultipleChoiceRequestDto[],
    createdQuizId: number,
  ): Promise<void>;
}
