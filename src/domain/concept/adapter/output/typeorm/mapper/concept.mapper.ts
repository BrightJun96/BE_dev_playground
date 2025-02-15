import {
  ConceptMetaDomain,
  ConceptMetaDomainProps,
} from "../../../../domain/concept-meta.domain";
import {
  ConceptDomain,
  ConceptDomainProps,
} from "../../../../domain/concept.domain";
import { ConceptMeta } from "../entities/concept-meta.entity";
import { Concept } from "../entities/concept.entity";

export class ConceptMapper {
  static toDomain(entity: Concept): ConceptDomain {
    const conceptProps: ConceptDomainProps = {
      id: entity.id,
      title: entity.title,
      content: entity.content,
      detailUrl: entity.detailUrl,
      tech: entity.tech,
      field: entity.field,
      conceptMeta: entity.conceptMeta
        ? ConceptMapper.toMetaDomain(entity.conceptMeta)
        : undefined,
    };

    return new ConceptDomain(conceptProps);
  }

  static toMetaDomain(
    entity: ConceptMeta,
  ): ConceptMetaDomain {
    const metaProps: ConceptMetaDomainProps = {
      id: entity.id,
      metaTitle: entity.metaTitle,
      metaDescription: entity.metaDescription,
      metaImageUrl: entity.metaImageUrl,
    };

    return new ConceptMetaDomain(metaProps);
  }
}
