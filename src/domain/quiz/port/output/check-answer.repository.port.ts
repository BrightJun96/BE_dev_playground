import { CheckAnswerRequestDto } from "../../dto/request/check-answer.request.dto";
import { CheckAnswerResponseDto } from "../../dto/response/check-answer.response.dto";
import { GetQuizSharedDto } from "../../dto/shared/get-quiz.shared.dto";

export interface CheckAnswerRepositoryPort {
  checkAnswer(
    dto: CheckAnswerRequestDto,
  ): Promise<CheckAnswerResponseDto>;
  findOneById(id: number): Promise<GetQuizSharedDto>;
}
