import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Relations } from "../../../../../../shared/const/relation.const";
import { MetadataSharedDto } from "../../../../../../shared/dto/metadata.shared.dto";
import { ConceptMetaDomain } from "../../../../domain/concept-meta.domain";
import { ConceptDomain } from "../../../../domain/concept.domain";
import { CreateConceptRequestDto } from "../../../../dto/request/create-concept.request.dto";
import { CreateConceptRepositoryPort } from "../../../../port/output/create-concept.repository.port";

import { ConceptMeta } from "../entities/concept-meta.entity";
import { Concept } from "../entities/concept.entity";
import { ConceptMapper } from "../mapper/concept.mapper";

export class ConceptRepositoryAdapter
  implements CreateConceptRepositoryPort
{
  constructor(
    @InjectRepository(Concept)
    private readonly conceptRepository: Repository<Concept>,

    @InjectRepository(ConceptMeta)
    private readonly conceptMetaRepository: Repository<ConceptMeta>,
  ) {}

  async findByDetailUrl(
    detailUrl: string,
  ): Promise<ConceptDomain | null> {
    const conceptEntity =
      await this.conceptRepository.findOne({
        where: { detailUrl },
        relations: [Relations.CONCEPT.META],
      });

    return conceptEntity
      ? ConceptMapper.toDomain(conceptEntity)
      : null;
  }

  async createMeta(
    metaData: MetadataSharedDto,
  ): Promise<ConceptMetaDomain> {
    const metaEntity =
      this.conceptMetaRepository.create(metaData);

    const savedMeta =
      await this.conceptMetaRepository.save(metaEntity);

    return ConceptMapper.toMetaDomain(savedMeta);
  }

  async createConcept(
    createConceptRequestDto: CreateConceptRequestDto,
    meta: ConceptMetaDomain,
  ): Promise<ConceptDomain> {
    const conceptEntity = this.conceptRepository.create({
      ...createConceptRequestDto,
      conceptMeta: { id: meta.getId() },
    });

    const savedConcept =
      await this.conceptRepository.save(conceptEntity);

    return ConceptMapper.toDomain(savedConcept);
  }
}
