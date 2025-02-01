import { Entity, OneToOne } from "typeorm";
import { SharedMetadataEntity } from "../../shared/entity/shared-metadata.entity";
import { Concept } from "./concept.entity";

@Entity({
  comment: "개념 메타데이터",
})
export class ConceptMeta extends SharedMetadataEntity {
  @OneToOne(() => Concept, (concept) => concept.id, {
    onDelete: "CASCADE",
  })
  concept: Concept;
}
