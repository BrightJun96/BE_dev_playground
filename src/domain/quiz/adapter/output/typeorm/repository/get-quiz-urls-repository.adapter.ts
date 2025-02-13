import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuizDetailURLResponseDto } from "../../../../dto/response/get-quiz-url.response.dto";
import { GetQuizUrlsRepositoryPort } from "../../../../port/output/get-quiz-urls.repository.port";
import { Quiz } from "../entities/quiz.entity";

export class GetQuizUrlsRepositoryAdapter
  implements GetQuizUrlsRepositoryPort
{
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async findDetailUrls(): Promise<
    QuizDetailURLResponseDto[]
  > {
    return await this.quizRepository
      .createQueryBuilder("quiz")
      .select(["quiz.detailUrl"])
      .orderBy("RANDOM()") // PostgreSQL에서는 RANDOM(), MySQL에서는 RAND() 사용
      .getMany();
  }
}
