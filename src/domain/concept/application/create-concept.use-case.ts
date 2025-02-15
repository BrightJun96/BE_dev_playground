import {
  BadRequestException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { QueryRunner } from "typeorm";
import { Relations } from "../../../shared/const/relation.const";
import { MetadataSharedDto } from "../../../shared/dto/metadata.shared.dto";
import { TransactionManagerPort } from "../../../shared/transaction/port/transaction-manager.port";
import { ConceptMeta } from "../adapter/output/typeorm/entities/concept-meta.entity";
import { Concept } from "../adapter/output/typeorm/entities/concept.entity";
import { CreateConceptRequestDto } from "../dto/request/create-concept.request.dto";
import { CreateConceptRepositoryPort } from "../port/output/create-concept.repository.port";

@Injectable()
export class CreateConceptUseCase {
  constructor(
    @Inject("ConceptRepositoryPort")
    private readonly conceptRepositoryPort: CreateConceptRepositoryPort,
    @Inject("TransactionManagerPort")
    private readonly transactionManagerPort: TransactionManagerPort,
  ) {}

  async execute(createConceptDto: CreateConceptRequestDto) {
    const duplicateOne =
      await this.conceptRepositoryPort.findByDetailUrl(
        createConceptDto.detailUrl,
      );

    if (duplicateOne) {
      throw new BadRequestException(
        "detailUrl은 중복되면 안됩니다.",
      );
    }

    return await this.transactionManagerPort.runInTransaction(
      async () => {
        const meta =
          await this.conceptRepositoryPort.createMeta(
            createConceptDto.metaData,
          );

        return await this.conceptRepositoryPort.createConcept(
          createConceptDto,
          meta,
        );
      },
    );
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
