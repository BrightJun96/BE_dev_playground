import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field } from "../enum/field.enum";
import { BaseTable } from "./base-table";

@Entity()
export class SharedEntity extends BaseTable {
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
}
