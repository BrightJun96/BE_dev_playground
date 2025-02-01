import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field } from "../../shared/enum/field.enum";
import { InterviewMetadata } from "./interview-metadata.entity";

@Entity()
export class Interview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: "제목",
  })
  title: string;

  @Column({
    comment: "내용",
  })
  content: string;

  @Column({
    comment: "URL-프론트에서 접근하기 위한 상세 경로",
    unique: true,
  })
  detailUrl: string;

  @Column({
    enum: Field,
    comment: "분야",
  })
  field: Field;

  @OneToOne(
    () => InterviewMetadata,
    (interviewMetaData) => interviewMetaData.id,
    {
      cascade: true,
    },
  )
  @JoinColumn()
  metaData: InterviewMetadata;
}
