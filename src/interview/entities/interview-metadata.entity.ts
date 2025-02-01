import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Interview } from "./interview.entity";

@Entity()
export class InterviewMetadata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: "인터뷰 제목-프론트 title 태그에 사용",
  })
  metaTitle: string;

  @Column({
    comment: "인터뷰 제목-프론트 description 태그에 사용",
  })
  metaDescription: string;

  @Column({
    comment: "인터뷰 제목-프론트 imageUrl에 사용",
    nullable: true,
  })
  metaImageUrl: string;

  @OneToOne(() => Interview, (interview) => interview.id, {
    onDelete: "CASCADE",
  })
  interview: Interview;
}
