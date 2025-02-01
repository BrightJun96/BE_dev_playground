import { Module } from "@nestjs/common";
import { ConceptController } from "./concept.controller";
import { ConceptService } from "./service/concept.service";
import { CreateConceptService } from "./service/create-concept.service";
import { UpdateConceptService } from "./service/update-concept.service";

@Module({
  controllers: [ConceptController],
  providers: [
    ConceptService,
    CreateConceptService,
    UpdateConceptService,
  ],
})
export class ConceptModule {}
