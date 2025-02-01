import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { SharedEntity } from "../../shared/entity/shared.entity";
import { Tech } from "../../shared/enum/tech.enum";
import { InterviewMetadata } from "./interview-metadata.entity";

@Entity({
  comment: "면접",
})
export class Interview extends SharedEntity {
  @Column({
    enum: Tech,
    comment: "기술",
  })
  tech: Tech;

  @OneToOne(
    () => InterviewMetadata,
    (interviewMetaData) => interviewMetaData.id,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  interviewMetaData: InterviewMetadata;
}
