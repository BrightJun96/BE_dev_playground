import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../../shared/shared.module";
import { TransactionModule } from "../../shared/transaction/transaction.module";
import { QuizRestApiAdapter } from "./adapter/input/quiz-rest-api.adapter";
import { MultipleChoice } from "./adapter/output/typeorm/entities/multiple-choice.entity";
import { QuizMetaData } from "./adapter/output/typeorm/entities/quiz-meta-data.entity";
import { Quiz } from "./adapter/output/typeorm/entities/quiz.entity";
import { CheckAnswerRepositoryTypeorm } from "./adapter/output/typeorm/repository/check-answer-repository.typeorm";
import { CreateQuizRepositoryTypeormAdapter } from "./adapter/output/typeorm/repository/create-quiz-repository.typeorm.adapter";
import { DeleteQuizRepositoryTypeormAdapter } from "./adapter/output/typeorm/repository/delete-quiz-repository.typeorm.adapter";
import { FindQuizByIdRepositoryTypeormAdapter } from "./adapter/output/typeorm/repository/find-quiz-by-id-repository.typeorm.adapter";
import { FindQuizByUrlRepositoryTypeormAdapter } from "./adapter/output/typeorm/repository/find-quiz-by-url-repository.typeorm.adapter";
import { GetQuizUrlsRepositoryAdapter } from "./adapter/output/typeorm/repository/get-quiz-urls-repository.adapter";
import { QuizListRepositoryTypeormAdapter } from "./adapter/output/typeorm/repository/quiz-list-repository.typeorm.adapter";
import { UpdateQuizRepositoryTypeormAdapter } from "./adapter/output/typeorm/repository/update-quiz-repository.typeorm.adapter";
import { CheckAnswerUsecase } from "./application/check-answer.usecase";
import { CreateQuizUsecase } from "./application/create-quiz.usecase";
import { DeleteQuizUsecase } from "./application/delete-quiz.usecase";
import { FindQuizByIdUsecase } from "./application/find-quiz-by-id.usecase";
import { FindQuizByUrlUsecase } from "./application/find-quiz-by-url.usecase";
import { GetQuizUrlsUsecase } from "./application/get-quiz-urls.usecase";
import { QuizListUsecase } from "./application/quiz-list.usecase";
import { UpdateQuizUsecase } from "./application/update-quiz.usecase";

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([
      Quiz,
      QuizMetaData,
      MultipleChoice,
    ]),
    TransactionModule,
  ],
  controllers: [QuizRestApiAdapter],
  providers: [
    QuizListUsecase,
    CreateQuizUsecase,
    UpdateQuizUsecase,
    FindQuizByIdUsecase,
    FindQuizByUrlUsecase,
    GetQuizUrlsUsecase,
    DeleteQuizUsecase,
    CheckAnswerUsecase,
    {
      provide: "CreateQuizRepositoryPort",
      useClass: CreateQuizRepositoryTypeormAdapter,
    },
    {
      provide: "UpdateQuizRepositoryPort",
      useClass: UpdateQuizRepositoryTypeormAdapter,
    },
    {
      provide: "QuizListRepositoryPort",
      useClass: QuizListRepositoryTypeormAdapter,
    },
    {
      provide: "FindQuizByIdRepositoryPort",
      useClass: FindQuizByIdRepositoryTypeormAdapter,
    },
    {
      provide: "FindQuizByUrlRepositoryPort",
      useClass: FindQuizByUrlRepositoryTypeormAdapter,
    },
    {
      provide: "GetQuizUrlsRepositoryPort",
      useClass: GetQuizUrlsRepositoryAdapter,
    },
    {
      provide: "DeleteQuizRepositoryPort",
      useClass: DeleteQuizRepositoryTypeormAdapter,
    },
    {
      provide: "CheckAnswerRepositoryPort",
      useClass: CheckAnswerRepositoryTypeorm,
    },
  ],
})
export class QuizModule {}
