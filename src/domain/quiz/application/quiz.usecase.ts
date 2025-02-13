import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Relations } from "../../../shared/const/relation.const";
import { Quiz } from "../adapter/output/typeorm/entities/quiz.entity";
import { CheckAnswerRequestDto } from "../dto/request/check-answer.request.dto";
import { CheckAnswerResponseDto } from "../dto/response/check-answer.response.dto";

@Injectable()
export class QuizUsecase {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  /**
   * 퀴즈 상세 - ID
   */
  async findOneById(id: number) {
    const quiz = await this.quizRepository.findOne({
      relations: [
        Relations.QUIZ.MULTIPLE,
        Relations.QUIZ.META,
      ],
      where: {
        id,
      },
    });

    if (!quiz) {
      throw new NotFoundException(
        "해당 퀴즈가 존재하지 않습니다.",
      );
    }

    return quiz;
  }

  /**
   * 정답 확인
   */
  async checkAnswer({
    quizId,
    answer,
  }: CheckAnswerRequestDto): Promise<CheckAnswerResponseDto> {
    const quiz = await this.findOneById(quizId);

    return {
      isCorrect: quiz.answer === answer,
    };
  }
}
