import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { QueryRunner } from "typeorm";
import { TransactionManagerPort } from "../../../shared/transaction/port/transaction-manager.port";
import { QuizDomain } from "../domain/quiz.domain";
import { CreateMultipleChoiceRequestDto } from "../dto/request/create-multiple-choice.request.dto";
import { CreateQuizMetaDataDtoRequest } from "../dto/request/create-quiz-meta-data.dto.request";
import { CreateQuizRequestDto } from "../dto/request/create-quiz.request.dto";
import { MultipleChoice } from "../entities/multiple-choice.entity";
import { QuizMetaData } from "../entities/quiz-meta-data.entity";
import { Quiz } from "../entities/quiz.entity";
import { CreateQuizRepositoryPort } from "../port/create-quiz.repository.port";

@Injectable()
export class CreateQuizService {
  constructor(
    private readonly createQuizRepositoryPort: CreateQuizRepositoryPort,
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
        await this.createQuizRepositoryPort.createQuizMetaData(
          createQuizDto.quizMetaData,
        );

        // 퀴즈 생성
        const quiz =
          await this.createQuizRepositoryPort.createQuiz(
            createQuizDto,
          );

        // 객관식 답안 생성
        await this.createQuizRepositoryPort.createMultipleChoices(
          createQuizDto.multipleChoices,
        );

        return await this.createQuizRepositoryPort.findOneById(
          quiz.id,
        );
      },
    );
  }

  /**
   * 퀴즈 메타 데이터 생성
   */
  async createQuizMetaData(
    metaData: CreateQuizMetaDataDtoRequest,
    qr: QueryRunner,
  ) {
    return await qr.manager
      .createQueryBuilder()
      .insert()
      .into(QuizMetaData)
      .values(metaData)
      .execute();
  }

  /**
   * 퀴즈 객관식 문제 생성
   */
  async createMultipleChoices(
    multipleChoicesDto: CreateMultipleChoiceRequestDto[],
    quizId: number,
    qr: QueryRunner,
  ) {
    // 각 DTO에 quiz 관계 추가
    const choicesWithQuiz = multipleChoicesDto.map(
      (choice) => ({
        ...choice,
        quiz: { id: quizId }, // 퀴즈 ID 설정
      }),
    );

    return await qr.manager
      .createQueryBuilder()
      .insert()
      .into(MultipleChoice)
      .values(choicesWithQuiz)
      .execute();
  }

  /**
   * 퀴즈 생성
   */
  async createQuiz(
    createQuizDto: CreateQuizRequestDto,
    metaDataId: number,
    qr: QueryRunner,
  ) {
    return await qr.manager
      .createQueryBuilder()
      .insert()
      .into(Quiz)
      .values({
        title: createQuizDto.title,
        content: createQuizDto.content,
        explanation: createQuizDto.explanation,
        detailUrl: createQuizDto.detailUrl,
        field: createQuizDto.field,
        answer: createQuizDto.answer,
        quizMetaData: { id: metaDataId },
      })
      .execute();
  }
}
