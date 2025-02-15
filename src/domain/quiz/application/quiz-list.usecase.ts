import { Inject, Injectable } from "@nestjs/common";
import { GetQuizListRequestDto } from "../dto/request/get-quiz-list.request.dto";
import { GetQuizListResponseDto } from "../dto/response/get-quiz-list.response.dto";
import { QuizListRepositoryPort } from "../port/output/quiz-list.repository.port";

@Injectable()
export class QuizListUsecase {
  constructor(
    @Inject("QuizListRepositoryPort")
    private readonly quizListRepositoryPort: QuizListRepositoryPort,
  ) {}

  /**
   * 퀴즈 목록
   */
  async findAll(
    getQuizListDto: GetQuizListRequestDto,
  ): Promise<GetQuizListResponseDto> {
    const { data, count, nextCursor } =
      await this.quizListRepositoryPort.findAll(
        getQuizListDto,
      );

    return {
      data,
      count,
      nextCursor,
    };
  }
}
