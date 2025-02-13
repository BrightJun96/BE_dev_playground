import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Relations } from "../../../../../shared/const/relation.const";
import { GetQuizSharedDto } from "../../../dto/shared/get-quiz.shared.dto";
import { FindQuizByIdRepositoryPort } from "../../../port/output/find-quiz-by-id.repository.port";
import { Quiz } from "./entities/quiz.entity";

export class FindQuizByIdRepositoryTypeormAdapter
  implements FindQuizByIdRepositoryPort
{
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}
  async findOneById(id: number): Promise<GetQuizSharedDto> {
    const quiz = await this.quizRepository.findOne({
      where: {
        id,
      },
      relations: [
        Relations.QUIZ.MULTIPLE,
        Relations.QUIZ.META,
      ],
    });

    if (!quiz) {
      throw new NotFoundException(
        "해당 퀴즈가 존재하지 않습니다.",
      );
    }

    return quiz;
  }
}
