import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { QueryRunner } from "typeorm";
import { Relations } from "../../../shared/const/relation.const";
import { UpdateMetadataSharedDto } from "../../../shared/dto/update-metadata.shared.dto";
import { UpdateConceptRequestDto } from "../dto/request/update-concept.request.dto";
import { ConceptMeta } from "../entities/concept-meta.entity";
import { Concept } from "../entities/concept.entity";

@Injectable()
export class UpdateConceptService {
  async update(
    id: number,
    updateConceptDto: UpdateConceptRequestDto,
    qr: QueryRunner,
  ) {
    const existOne = await this.findOne(id, qr);

    if (!existOne) {
      throw new BadRequestException(
        "존재하지 않는 데이터입니다.",
      );
    }

    if (updateConceptDto.metaData) {
      await this.updateMeta(
        existOne.conceptMeta.id,
        updateConceptDto.metaData,
        qr,
      );
    }

    await this.updateConcept(id, updateConceptDto, qr);

    return this.findOne(id, qr);
  }

  async updateMeta(
    metaId: number,
    updateMetadataSharedDto: UpdateMetadataSharedDto,
    qr: QueryRunner,
  ) {
    await qr.manager
      .createQueryBuilder()
      .update(ConceptMeta)
      .set(updateMetadataSharedDto)
      .where("id=:id", {
        id: metaId,
      })
      .execute();
  }

  async updateConcept(
    conceptId: number,
    updateConceptRequestDto: UpdateConceptRequestDto,
    qr: QueryRunner,
  ) {
    await qr.manager
      .createQueryBuilder()
      .update(Concept)
      .set({
        title: updateConceptRequestDto.title,
        content: updateConceptRequestDto.content,
        detailUrl: updateConceptRequestDto.detailUrl,
        field: updateConceptRequestDto.field,
        tech: updateConceptRequestDto.tech,
      })
      .where("id=:id", {
        id: conceptId,
      })
      .execute();
  }

  async findOne(conceptId: number, qr: QueryRunner) {
    return await qr.manager.findOne(Concept, {
      where: {
        id: conceptId,
      },
      relations: [Relations.CONCEPT.META],
    });
  }
}
