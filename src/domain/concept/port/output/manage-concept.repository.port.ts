import { ConceptDomain } from "../../domain/concept.domain";
import { GetConceptListRequestDto } from "../../dto/request/get-concept-list.request.dto";

export interface ManageConceptRepositoryPort {
  findAll(
    getConceptListRequestDto: GetConceptListRequestDto,
  ): Promise<ConceptDomain[]>;
  findOne(id: number): Promise<ConceptDomain | null>;
  findOneByUrl(url: string): Promise<ConceptDomain | null>;
  remove(id: number): Promise<boolean>;
}
