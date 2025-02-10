import { InsertResult } from "typeorm";
import { QuizDomain } from "../domain/quiz.domain";
import { CreateQuizMetaDataDtoRequest } from "../dto/request/create-quiz-meta-data.dto.request";
import { CreateQuizRequestDto } from "../dto/request/create-quiz.request.dto";

export interface QuizRepositoryPort {
  findOneById(id: number): Promise<QuizDomain | null>;
  findOneByUrl(url: string): Promise<QuizDomain | null>;
  createQuizMetaData(
    metaData: CreateQuizMetaDataDtoRequest,
  ): Promise<InsertResult>;
  createQuiz(
    createQuizRequestDto: CreateQuizRequestDto,
    metaDataId: number,
  ): Promise<InsertResult>;
  createMultipleChoices(): Promise<InsertResult>;
}
