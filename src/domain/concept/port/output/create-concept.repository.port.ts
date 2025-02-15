import { MetadataSharedDto } from "../../../../shared/dto/metadata.shared.dto";
import { ConceptMetaDomain } from "../../domain/concept-meta.domain";
import { ConceptDomain } from "../../domain/concept.domain";
import { CreateConceptRequestDto } from "../../dto/request/create-concept.request.dto";

export interface CreateConceptRepositoryPort {
  findByDetailUrl(
    detailUrl: string,
  ): Promise<ConceptDomain | null>;
  createMeta(
    metaData: MetadataSharedDto,
  ): Promise<ConceptMetaDomain>;
  createConcept(
    createConceptRequestDto: CreateConceptRequestDto,
    meta: ConceptMetaDomain,
  ): Promise<ConceptDomain>;
}
