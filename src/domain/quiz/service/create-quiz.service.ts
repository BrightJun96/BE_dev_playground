import {
  BadRequestException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { TransactionManagerPort } from "../../../shared/transaction/port/transaction-manager.port";
import { QuizDomain } from "../domain/quiz.domain";
import { CreateQuizRequestDto } from "../dto/request/create-quiz.request.dto";
import { CreateQuizRepositoryPort } from "../port/create-quiz.repository.port";

@Injectable()
export class CreateQuizService {
  constructor(
    @Inject("CreateQuizRepositoryPort")
    private readonly createQuizRepositoryPort: CreateQuizRepositoryPort,
    @Inject("TransactionManagerPort")
    private readonly transactionManager: TransactionManagerPort, // 트랜잭션 관리 객체
  ) {}

  /**
   * 퀴즈 생성
   */
  async create(
    createQuizDto: CreateQuizRequestDto,
  ): Promise<QuizDomain> {
    const duplicationUrlQuiz =
      await this.createQuizRepositoryPort.findOneByUrl(
        createQuizDto.detailUrl,
      );

    if (duplicationUrlQuiz) {
      throw new BadRequestException(
        "detailUrl은 중복되면 안됩니다.",
      );
    }

    return await this.transactionManager.runInTransaction<QuizDomain>(
      async () => {
        // 메타데이터 생성
        const metaData =
          await this.createQuizRepositoryPort.createQuizMetaData(
            createQuizDto.quizMetaData,
          );

        // 퀴즈 생성
        const quiz =
          await this.createQuizRepositoryPort.createQuiz(
            createQuizDto,
            metaData.id,
          );

        // 객관식 답안 생성
        await this.createQuizRepositoryPort.createMultipleChoices(
          createQuizDto.multipleChoices,
          quiz.id,
        );

        return await this.createQuizRepositoryPort.findOneById(
          quiz.id,
        );
      },
    );
  }
}
