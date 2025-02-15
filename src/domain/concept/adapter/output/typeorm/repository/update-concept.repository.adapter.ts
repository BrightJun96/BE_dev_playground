import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Relations } from "../../../../../../shared/const/relation.const";
import { UpdateMetadataSharedDto } from "../../../../../../shared/dto/update-metadata.shared.dto";
import { ConceptDomain } from "../../../../domain/concept.domain";
import { UpdateConceptRequestDto } from "../../../../dto/request/update-concept.request.dto";
import { UpdateConceptRepositoryPort } from "../../../../port/output/update-concept.repository.port";
import { ConceptMeta } from "../entities/concept-meta.entity";
import { Concept } from "../entities/concept.entity";

import { ConceptMapper } from "../mapper/concept.mapper";

@Injectable()
export class UpdateConceptRepositoryAdapter
  implements UpdateConceptRepositoryPort
{
  constructor(
    @InjectRepository(Concept)
    private readonly conceptRepository: Repository<Concept>,

    @InjectRepository(ConceptMeta)
    private readonly conceptMetaRepository: Repository<ConceptMeta>,
  ) {}

  async findById(
    id: number,
  ): Promise<ConceptDomain | null> {
    const conceptEntity =
      await this.conceptRepository.findOne({
        where: { id },
        relations: [Relations.CONCEPT.META],
      });

    return conceptEntity
      ? ConceptMapper.toDomain(conceptEntity)
      : null;
  }

  async updateMeta(
    metaId: number,
    updateMetadataSharedDto: UpdateMetadataSharedDto,
  ): Promise<void> {
    await this.conceptMetaRepository.update(
      metaId,
      updateMetadataSharedDto,
    );
  }

  async updateConcept(
    conceptId: number,
    updateConceptRequestDto: UpdateConceptRequestDto,
  ): Promise<void> {
    await this.conceptRepository.update(conceptId, {
      title: updateConceptRequestDto.title,
      content: updateConceptRequestDto.content,
      detailUrl: updateConceptRequestDto.detailUrl,
      field: updateConceptRequestDto.field,
      tech: updateConceptRequestDto.tech,
    });
  }
}
