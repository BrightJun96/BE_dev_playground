import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetQuizSharedDto } from "../../../dto/shared/get-quiz.shared.dto";
import { FindQuizByUrlRepositoryPort } from "../../../port/output/find-quiz-by-url.repository.port";
import { Quiz } from "./entities/quiz.entity";

export class FindQuizByUrlRepositoryTypeormAdapter
  implements FindQuizByUrlRepositoryPort
{
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async findOneByUrl(
    url: string,
  ): Promise<GetQuizSharedDto> {
    const quiz = await this.quizRepository.findOne({
      where: {
        detailUrl: url,
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
