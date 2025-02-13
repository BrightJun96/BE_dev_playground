import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "../../shared/shared.module";
import { TypeormTransactionAdapter } from "../../shared/transaction/typeorm-transaction.adapter";
import { CreateQuizRepositoryTypeormAdapter } from "./adapter/create-quiz-repository.typeorm.adapter";
import { MultipleChoice } from "./entities/multiple-choice.entity";
import { QuizMetaData } from "./entities/quiz-meta-data.entity";
import { Quiz } from "./entities/quiz.entity";
import { QuizController } from "./quiz.controller";
import { CreateQuizService } from "./service/create-quiz.service";
import { QuizListService } from "./service/quiz-list.service";
import { QuizService } from "./service/quiz.service";
import { UpdateQuizService } from "./service/update-quiz.service";

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([
      Quiz,
      QuizMetaData,
      MultipleChoice,
    ]),
  ],
  controllers: [QuizController],
  providers: [
    QuizService,
    QuizListService,
    CreateQuizService,
    {
      provide: "CreateQuizRepositoryPort",
      useClass: CreateQuizRepositoryTypeormAdapter,
    },
    {
      provide: "TransactionManagerPort",
      useClass: TypeormTransactionAdapter,
    },

    UpdateQuizService,
  ],
})
export class QuizModule {}
