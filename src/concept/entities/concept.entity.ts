import { Column, Entity } from "typeorm";
import { SharedEntity } from "../../shared/entity/shared.entity";
import { Tech } from "../../shared/enum/tech.enum";

@Entity({
  comment: "개념",
})
export class Concept extends SharedEntity {
  @Column({
    enum: Tech,
    comment: "기술",
  })
  tech: Tech;
}
