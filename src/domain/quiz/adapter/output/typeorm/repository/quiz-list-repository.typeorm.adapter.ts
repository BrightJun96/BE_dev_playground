import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SharedService } from "../../../../../../shared/shared.service";
import { QuizDomain } from "../../../../domain/quiz.domain";
import { GetQuizListRequestDto } from "../../../../dto/request/get-quiz-list.request.dto";
import { QuizListRepositoryPort } from "../../../../port/output/quiz-list.repository.port";
import { Quiz } from "../entities/quiz.entity";
import { toQuizDomain } from "../mapper/quiz.mapper";

export class QuizListRepositoryTypeormAdapter
  implements QuizListRepositoryPort
{
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly sharedService: SharedService,
  ) {}
  async findAll(query: GetQuizListRequestDto): Promise<{
    data: QuizDomain[];
    count: number;
    nextCursor?: string;
  }> {
    const qb =
      this.quizRepository.createQueryBuilder("quiz");

    const {
      title,
      content,
      explanation,
      field,
      detailUrl,
    } = query;

    if (title)
      qb.andWhere("quiz.title LIKE :title", {
        title: `%${title}%`,
      });
    if (content)
      qb.andWhere("quiz.content LIKE :content", {
        content: `%${content}%`,
      });
    if (explanation)
      qb.andWhere("quiz.explanation LIKE :explanation", {
        explanation: `%${explanation}%`,
      });
    if (field)
      qb.andWhere("quiz.field LIKE :field", {
        field: `%${field}%`,
      });
    if (detailUrl)
      qb.andWhere("quiz.detailUrl LIKE :detailUrl", {
        detailUrl: `%${detailUrl}%`,
      });

    const { nextCursor } =
      await this.sharedService.applyCursorPaginationParamsToQb<Quiz>(
        qb,
        query,
      );

    const [entities, count] = await qb.getManyAndCount();
    const data = entities.map((entity) => {
      const quizDomain = toQuizDomain(entity);
      quizDomain.assignId(entity.id);
      return quizDomain;
    });

    return { data, count, nextCursor };
  }
}
