import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../../shared/shared.module";
import { TransactionModule } from "../../shared/transaction/transaction.module";
import { QuizRestApiAdapter } from "./adapter/input/quiz-rest-api.adapter";
import { CreateQuizRepositoryTypeormAdapter } from "./adapter/output/typeorm/create-quiz-repository.typeorm.adapter";
import { MultipleChoice } from "./adapter/output/typeorm/entities/multiple-choice.entity";
import { QuizMetaData } from "./adapter/output/typeorm/entities/quiz-meta-data.entity";
import { Quiz } from "./adapter/output/typeorm/entities/quiz.entity";
import { QuizListRepositoryTypeormAdapter } from "./adapter/output/typeorm/quiz-list-repository.typeorm.adapter";
import { UpdateQuizRepositoryTypeormAdapter } from "./adapter/output/typeorm/update-quiz-repository.typeorm.adapter";
import { CreateQuizUsecase } from "./application/create-quiz.usecase";
import { QuizListUsecase } from "./application/quiz-list.usecase";
import { QuizUsecase } from "./application/quiz.usecase";
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
    QuizUsecase,
    QuizListUsecase,
    CreateQuizUsecase,
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
    UpdateQuizUsecase,
  ],
})
export class QuizModule {}
