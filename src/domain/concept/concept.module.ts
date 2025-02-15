import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConceptRestApiControllerAdapter } from "./adapter/input/concept-rest-api.controller.adapter";
import { ConceptMeta } from "./adapter/output/typeorm/entities/concept-meta.entity";
import { Concept } from "./adapter/output/typeorm/entities/concept.entity";
import { ManageConceptRepositoryAdapter } from "./adapter/output/typeorm/repository/manage-concept.repository.adapter";
import { CreateConceptService } from "./application/create-concept.service";
import { ManageConceptUseCase } from "./application/manage-concept.use-case";
import { UpdateConceptService } from "./application/update-concept.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Concept, ConceptMeta]),
  ],
  controllers: [ConceptRestApiControllerAdapter],
  providers: [
    ManageConceptUseCase,
    {
      provide: "ManageConceptRepositoryPort",
      useClass: ManageConceptRepositoryAdapter,
    },

    CreateConceptService,
    UpdateConceptService,
  ],
})
export class ConceptModule {}
