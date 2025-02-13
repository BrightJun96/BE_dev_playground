import { Inject, Injectable } from "@nestjs/common";
import { TransactionManagerPort } from "../../../shared/transaction/port/transaction-manager.port";
import { QuizDomain } from "../domain/quiz.domain";
import { UpdateQuizRequestDto } from "../dto/request/update-quiz.request.dto";
import { UpdateQuizRepositoryPort } from "../port/output/update-quiz.repository.port";

@Injectable()
export class UpdateQuizUsecase {
  constructor(
    @Inject("UpdateQuizRepositoryPort")
    private readonly updateQuizRepositoryPort: UpdateQuizRepositoryPort,
    @Inject("TransactionManagerPort")
    private readonly transactionManagerPort: TransactionManagerPort,
  ) {}

  /**
   * 퀴즈 수정
   */
  async execute(
    id: number,
    updateQuizDto: UpdateQuizRequestDto,
  ): Promise<QuizDomain> {
    const quiz =
      await this.updateQuizRepositoryPort.findOneById(id);

    return await this.transactionManagerPort.runInTransaction<QuizDomain>(
      async () => {
        if (updateQuizDto.quizMetaData) {
          await this.updateQuizRepositoryPort.updateMetaData(
            quiz.quizMetaData.id,
            updateQuizDto.quizMetaData,
          );
        }

        if (updateQuizDto.multipleChoices) {
          await this.updateQuizRepositoryPort.updateMultipleChoices(
            updateQuizDto.multipleChoices,
          );
        }

        await this.updateQuizRepositoryPort.updateQuiz(
          id,
          updateQuizDto,
        );

        return await this.updateQuizRepositoryPort.findOneById(
          id,
        );
      },
    );
  }
}
