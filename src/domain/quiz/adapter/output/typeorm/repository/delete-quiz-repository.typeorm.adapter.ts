import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Relations } from "../../../../../../shared/const/relation.const";
import { DeleteQuizResponseDto } from "../../../../dto/response/delete-quiz.response.dto";
import { GetQuizSharedDto } from "../../../../dto/shared/get-quiz.shared.dto";
import { DeleteQuizRepositoryPort } from "../../../../port/output/delete-quiz.repository.port";
import { Quiz } from "../entities/quiz.entity";

export class DeleteQuizRepositoryTypeormAdapter
  implements DeleteQuizRepositoryPort
{
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async remove(id: number): Promise<DeleteQuizResponseDto> {
    await this.findOneById(id);
    await this.quizRepository.delete(id);

    return {
      removeStatus: true,
    };
  }

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
