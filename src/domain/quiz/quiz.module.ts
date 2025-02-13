import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../../shared/shared.module";
import { TransactionModule } from "../../shared/transaction/transaction.module";
import { QuizRestApiController } from "./adapter/input/quiz-rest-api.controller";
import { CreateQuizRepositoryTypeormAdapter } from "./adapter/output/create-quiz-repository.typeorm.adapter";
import { CreateQuizUsecase } from "./application/create-quiz.usecase";
import { QuizListUsecase } from "./application/quiz-list.usecase";
import { QuizUsecase } from "./application/quiz.usecase";
import { UpdateQuizUsecase } from "./application/update-quiz.usecase";
import { MultipleChoice } from "./entities/multiple-choice.entity";
import { QuizMetaData } from "./entities/quiz-meta-data.entity";
import { Quiz } from "./entities/quiz.entity";

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
  controllers: [QuizRestApiController],
  providers: [
    QuizUsecase,
    QuizListUsecase,
    CreateQuizUsecase,
    {
      provide: "CreateQuizRepositoryPort",
      useClass: CreateQuizRepositoryTypeormAdapter,
    },
    // {
    //   provide: "TransactionManagerPort",
    //   useClass: TypeormTransactionAdapter,
    // },

    UpdateQuizUsecase,
  ],
})
export class QuizModule {}
