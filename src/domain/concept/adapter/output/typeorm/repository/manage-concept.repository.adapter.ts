import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Relations } from "../../../../../../shared/const/relation.const";
import { ConceptDomain } from "../../../../domain/concept.domain";
import { GetConceptListRequestDto } from "../../../../dto/request/get-concept-list.request.dto";
import { ManageConceptRepositoryPort } from "../../../../port/output/manage-concept.repository.port";
import { Concept } from "../entities/concept.entity";
import { ConceptMapper } from "../mapper/concept.mapper";

export class ManageConceptRepositoryAdapter
  implements ManageConceptRepositoryPort
{
  constructor(
    @InjectRepository(Concept)
    private readonly conceptRepository: Repository<Concept>,
  ) {}

  async findAll(
    getConceptListRequestDto: GetConceptListRequestDto,
  ): Promise<ConceptDomain[]> {
    const where: any = {};

    if (getConceptListRequestDto.tech) {
      where.tech = getConceptListRequestDto.tech;
    }

    if (getConceptListRequestDto.field) {
      where.field = getConceptListRequestDto.field;
    }

    const concepts = await this.conceptRepository.find({
      relations: [Relations.CONCEPT.META],
      where,
    });

    return concepts.map(ConceptMapper.toDomain);
  }

  async findOne(id: number): Promise<ConceptDomain | null> {
    const concept = await this.conceptRepository.findOne({
      where: { id },
      relations: [Relations.CONCEPT.META],
    });

    return concept ? ConceptMapper.toDomain(concept) : null;
  }

  async findOneByUrl(
    url: string,
  ): Promise<ConceptDomain | null> {
    const concept = await this.conceptRepository.findOne({
      where: { detailUrl: url },
      relations: [Relations.CONCEPT.META],
    });

    return concept ? ConceptMapper.toDomain(concept) : null;
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id);
    await this.conceptRepository.delete(id);
    return true;
  }
}
