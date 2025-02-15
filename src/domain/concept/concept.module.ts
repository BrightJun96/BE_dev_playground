import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionModule } from "../../shared/transaction/transaction.module";
import { ConceptRestApiControllerAdapter } from "./adapter/input/concept-rest-api.controller.adapter";
import { ConceptMeta } from "./adapter/output/typeorm/entities/concept-meta.entity";
import { Concept } from "./adapter/output/typeorm/entities/concept.entity";
import { CreateConceptRepositoryAdapter } from "./adapter/output/typeorm/repository/create-concept.repository.adapter";
import { ManageConceptRepositoryAdapter } from "./adapter/output/typeorm/repository/manage-concept.repository.adapter";
import { UpdateConceptRepositoryAdapter } from "./adapter/output/typeorm/repository/update-concept.repository.adapter";
import { CreateConceptUseCase } from "./application/create-concept.use-case";
import { ManageConceptUseCase } from "./application/manage-concept.use-case";
import { UpdateConceptUseCase } from "./application/update-concept.use-case";

@Module({
  imports: [
    TypeOrmModule.forFeature([Concept, ConceptMeta]),
    TransactionModule,
  ],
  controllers: [ConceptRestApiControllerAdapter],
  providers: [
    ManageConceptUseCase,
    {
      provide: "ManageConceptRepositoryPort",
      useClass: ManageConceptRepositoryAdapter,
    },
    CreateConceptUseCase,
    {
      provide: "CreateConceptRepositoryPort",
      useClass: CreateConceptRepositoryAdapter,
    },
    UpdateConceptUseCase,
    {
      provide: "UpdateConceptRepositoryPort",
      useClass: UpdateConceptRepositoryAdapter,
    },
  ],
})
export class ConceptModule {}
