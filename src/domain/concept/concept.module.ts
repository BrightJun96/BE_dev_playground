import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionModule } from "../../shared/transaction/transaction.module";
import { ConceptRestApiControllerAdapter } from "./adapter/input/concept-rest-api.controller.adapter";
import { ConceptMeta } from "./adapter/output/typeorm/entities/concept-meta.entity";
import { Concept } from "./adapter/output/typeorm/entities/concept.entity";
import { ConceptRepositoryAdapter } from "./adapter/output/typeorm/repository/create-concept.repository.adapter";
import { ManageConceptRepositoryAdapter } from "./adapter/output/typeorm/repository/manage-concept.repository.adapter";
import { CreateConceptUseCase } from "./application/create-concept.use-case";
import { ManageConceptUseCase } from "./application/manage-concept.use-case";
import { UpdateConceptService } from "./application/update-concept.service";

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
      provide: "ConceptRepositoryPort",
      useClass: ConceptRepositoryAdapter,
    },
    UpdateConceptService,
  ],
})
export class ConceptModule {}
