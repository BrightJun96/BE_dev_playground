import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { SharedEntity } from "../../../../../../shared/entity/shared.entity";
import { MultipleChoice } from "./multiple-choice.entity";
import { QuizMetaData } from "./quiz-meta-data.entity";

@Entity({
  comment: "퀴즈",
})
export class Quiz extends SharedEntity {
  @Column({
    comment: "퀴즈 해설",
  })
  explanation: string;

  @Column({
    comment: "정답",
  })
  answer: number;

  @OneToOne(
    () => QuizMetaData,
    (quizMetaData) => quizMetaData.id,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  quizMetaData: QuizMetaData;

  @OneToMany(
    () => MultipleChoice,
    (multipleChoice) => multipleChoice.quiz,
    {
      cascade: true,
    },
  )
  multipleChoices: MultipleChoice[];
}
