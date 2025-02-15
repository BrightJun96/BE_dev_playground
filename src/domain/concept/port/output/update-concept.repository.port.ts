import { UpdateMetadataSharedDto } from "../../../../shared/dto/update-metadata.shared.dto";
import { ConceptDomain } from "../../domain/concept.domain";

import { UpdateConceptRequestDto } from "../../dto/request/update-concept.request.dto";

export interface UpdateConceptRepositoryPort {
  findById(id: number): Promise<ConceptDomain | null>;
  updateMeta(
    metaId: number,
    updateMetadataSharedDto: UpdateMetadataSharedDto,
  ): Promise<void>;
  updateConcept(
    conceptId: number,
    updateConceptRequestDto: UpdateConceptRequestDto,
  ): Promise<void>;
}
