import { Inject, Injectable } from "@nestjs/common";
import { TransactionManagerPort } from "../../../shared/transaction/port/transaction-manager.port";
import { MultipleChoiceDomain } from "../domain/multiple-choice.domain";
import { QuizMetaDataDomain } from "../domain/quiz-meta-data.domain";
import { QuizDomain } from "../domain/quiz.domain";
import { CreateQuizRequestDto } from "../dto/request/create-quiz.request.dto";
import { CreateQuizRepositoryPort } from "../port/output/create-quiz.repository.port";

@Injectable()
export class CreateQuizUsecase {
  constructor(
    @Inject("CreateQuizRepositoryPort")
    private readonly createQuizRepositoryPort: CreateQuizRepositoryPort,
    @Inject("TransactionManagerPort")
    private readonly transactionManagerPort: TransactionManagerPort,
  ) {}

  /**
   * 퀴즈 생성
   */
  async execute(
    createQuizDto: CreateQuizRequestDto,
  ): Promise<QuizDomain> {
    await this.createQuizRepositoryPort.findOneByUrl(
      createQuizDto.detailUrl,
    );

    return await this.transactionManagerPort.runInTransaction<QuizDomain>(
      async () => {
        // 메타데이터 생성
        const quizMetaData = new QuizMetaDataDomain(
          createQuizDto.quizMetaData,
        );

        // 객관식 답안 생성
        const multipleChoices =
          createQuizDto.multipleChoices.map(
            (choiceDto) =>
              new MultipleChoiceDomain(choiceDto),
          );

        // QuizDomain 내부에서 생성 로직 처리
        const quizDomain = QuizDomain.create(
          createQuizDto,
          quizMetaData,
          multipleChoices,
        );

        // 퀴즈 저장
        return await this.createQuizRepositoryPort.save(
          quizDomain,
        );
      },
    );
  }
}
