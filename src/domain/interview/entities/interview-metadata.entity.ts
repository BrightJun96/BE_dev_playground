import {
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SharedMetadataEntity } from "../../../shared/entity/shared-metadata.entity";
import { Interview } from "./interview.entity";

@Entity({
  comment: "면접 메타 데이터",
})
export class InterviewMetadata extends SharedMetadataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Interview, (interview) => interview.id, {
    onDelete: "CASCADE",
  })
  interview: Interview;
}
