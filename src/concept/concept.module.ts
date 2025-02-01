import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConceptController } from "./concept.controller";
import { ConceptMeta } from "./entities/concept-meta.entity";
import { Concept } from "./entities/concept.entity";
import { ConceptService } from "./service/concept.service";
import { CreateConceptService } from "./service/create-concept.service";
import { UpdateConceptService } from "./service/update-concept.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Concept, ConceptMeta]),
  ],
  controllers: [ConceptController],
  providers: [
    ConceptService,
    CreateConceptService,
    UpdateConceptService,
  ],
})
export class ConceptModule {}
