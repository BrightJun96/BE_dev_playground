import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { QueryRunner } from "typeorm";
import { Relations } from "../../../shared/const/relation.const";
import { MetadataSharedDto } from "../../../shared/dto/metadata.shared.dto";
import { ConceptMeta } from "../adapter/output/typeorm/entities/concept-meta.entity";
import { Concept } from "../adapter/output/typeorm/entities/concept.entity";
import { CreateConceptRequestDto } from "../dto/request/create-concept.request.dto";

@Injectable()
export class CreateConceptService {
  async create(
    createConceptDto: CreateConceptRequestDto,
    qr: QueryRunner,
  ) {
    const duplicateOne = await qr.manager.findOne(Concept, {
      where: {
        detailUrl: createConceptDto.detailUrl,
      },
    });

    if (duplicateOne) {
      throw new BadRequestException(
        "detailUrl은 중복되면 안됩니다.",
      );
    }

    const meta = await this.createMeta(
      createConceptDto.metaData,
      qr,
    );

    const metaId = meta.identifiers[0].id;

    const concept = await this.createConcept(
      createConceptDto,
      metaId,
      qr,
    );

    const conceptId = concept.identifiers[0].id;

    return this.findOne(conceptId, qr);
  }

  findOne(conceptId: number, qr: QueryRunner) {
    return qr.manager.findOne(Concept, {
      relations: [Relations.CONCEPT.META],
      where: {
        id: conceptId,
      },
    });
  }

  createMeta(
    createMeta: MetadataSharedDto,
    qr: QueryRunner,
  ) {
    return qr.manager
      .createQueryBuilder()
      .insert()
      .into(ConceptMeta)
      .values(createMeta)
      .execute();
  }

  createConcept(
    createConceptRequestDto: CreateConceptRequestDto,
    metaId: number,
    qr: QueryRunner,
  ) {
    return qr.manager
      .createQueryBuilder()
      .insert()
      .into(Concept)
      .values({
        title: createConceptRequestDto.title,
        content: createConceptRequestDto.content,
        detailUrl: createConceptRequestDto.detailUrl,
        field: createConceptRequestDto.field,
        tech: createConceptRequestDto.tech,
        conceptMeta: {
          id: metaId,
        },
      })
      .execute();
  }
}
