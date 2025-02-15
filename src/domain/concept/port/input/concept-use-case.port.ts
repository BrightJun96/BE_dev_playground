import { QueryRunner } from "typeorm";
import { DeleteResponseDto } from "../../../../shared/dto/delete.response.dto";
import { ConceptDomain } from "../../domain/concept.domain";
import { CreateConceptRequestDto } from "../../dto/request/create-concept.request.dto";
import { GetConceptListRequestDto } from "../../dto/request/get-concept-list.request.dto";
import { UpdateConceptRequestDto } from "../../dto/request/update-concept.request.dto";
import { GetConceptSharedDto } from "../../dto/shared/get-concept.shared.dto";

export interface ConceptUseCasePort {
  // 사용자 기능
  findAll(
    getConceptListRequestDto: GetConceptListRequestDto,
  ): Promise<ConceptDomain[]>;
  findDetailByUrl(url: string): Promise<ConceptDomain>;

  // 관리자 기능
  create(
    createConceptDto: CreateConceptRequestDto,
    qr: QueryRunner,
  ): Promise<GetConceptSharedDto>;
  update(
    id: number,
    updateConceptDto: UpdateConceptRequestDto,
    qr: QueryRunner,
  ): Promise<GetConceptSharedDto>;
  findOne(id: number): Promise<ConceptDomain>;
  remove(id: number): Promise<DeleteResponseDto>;
}
