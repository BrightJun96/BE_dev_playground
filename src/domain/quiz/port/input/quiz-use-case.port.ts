import { QueryRunner } from "typeorm";
import { CheckAnswerRequestDto } from "../../dto/request/check-answer.request.dto";
import { CreateQuizRequestDto } from "../../dto/request/create-quiz.request.dto";
import { GetQuizListRequestDto } from "../../dto/request/get-quiz-list.request.dto";
import { UpdateQuizRequestDto } from "../../dto/request/update-quiz.request.dto";
import { CheckAnswerResponseDto } from "../../dto/response/check-answer.response.dto";
import { DeleteQuizResponseDto } from "../../dto/response/delete-quiz.response.dto";
import { GetQuizListResponseDto } from "../../dto/response/get-quiz-list.response.dto";
import { QuizDetailURLResponseDto } from "../../dto/response/get-quiz-url.response.dto";
import { GetQuizSharedDto } from "../../dto/shared/get-quiz.shared.dto";

export interface QuizUseCasePort {
  findOneByUrl(url: string): Promise<GetQuizSharedDto>;
  findDetailUrls(): Promise<QuizDetailURLResponseDto[]>;
  checkAnswer(
    dto: CheckAnswerRequestDto,
  ): Promise<CheckAnswerResponseDto>;
  findAll(
    dto: GetQuizListRequestDto,
  ): Promise<GetQuizListResponseDto>;
  create(
    dto: CreateQuizRequestDto,
  ): Promise<GetQuizSharedDto>;
  update(
    id: number,
    dto: UpdateQuizRequestDto,
    qr: QueryRunner,
  ): Promise<GetQuizSharedDto>;
  findOneById(id: number): Promise<GetQuizSharedDto>;
  remove(id: number): Promise<DeleteQuizResponseDto>;
}
