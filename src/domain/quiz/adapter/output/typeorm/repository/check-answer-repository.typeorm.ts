import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Relations } from "../../../../../../shared/const/relation.const";
import { CheckAnswerRequestDto } from "../../../../dto/request/check-answer.request.dto";
import { CheckAnswerResponseDto } from "../../../../dto/response/check-answer.response.dto";
import { CheckAnswerRepositoryPort } from "../../../../port/output/check-answer.repository.port";
import { Quiz } from "../entities/quiz.entity";

export class CheckAnswerRepositoryTypeorm
  implements CheckAnswerRepositoryPort
{
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async checkAnswer(
    dto: CheckAnswerRequestDto,
  ): Promise<CheckAnswerResponseDto> {
    const quiz = await this.findOneById(dto.quizId);

    return {
      isCorrect: quiz.answer === dto.answer,
    };
  }

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
}
