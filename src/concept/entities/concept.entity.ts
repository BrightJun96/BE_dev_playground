import { Column, Entity, OneToOne } from "typeorm";
import { SharedEntity } from "../../shared/entity/shared.entity";
import { Tech } from "../../shared/enum/tech.enum";
import { ConceptMeta } from "./concept-meta.entity";

@Entity({
  comment: "개념",
})
export class Concept extends SharedEntity {
  @Column({
    enum: Tech,
    comment: "기술",
  })
  tech: Tech;

  @OneToOne(
    () => ConceptMeta,
    (conceptMeta) => conceptMeta.id,
    {
      cascade: true,
    },
  )
  conceptMeta: ConceptMeta;
}
