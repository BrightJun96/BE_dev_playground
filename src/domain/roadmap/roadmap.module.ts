import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoadmapRestApiAdapter } from "./adapter/input/roadmap-rest-api.adapter";
import {
  Roadmap,
  RoadmapSchema,
} from "./adapter/output/mongoose/schema/roadmap.scheme";
import { CreateRoadmapRepositoryAdapter } from "./adapter/output/repository/create-roadmap.repository.adapter";
import { GetAllRoadmapsRepositoryAdapter } from "./adapter/output/repository/get-all-roadmaps.repository.adapter";
import { GetRoadmapByIdRepositoryAdapter } from "./adapter/output/repository/get-roadmap-by-id.repository.adapter";
import { GetRoadmapByTitleRepositoryAdapter } from "./adapter/output/repository/get-roadmap-by-title.repository.adapter";
import { RemoveRoadmapRepositoryAdapter } from "./adapter/output/repository/remove-roadmap.repository.adapter";
import { UpdateRoadmapRepositoryAdapter } from "./adapter/output/repository/update-roadmap.repository.adapter";
import { CreateRoadmapUseCase } from "./application/create-roadmap.use-case";
import { GetAllRoadmapsUseCase } from "./application/get-all-roadmaps.usecase";
import { GetRoadmapByIdUseCase } from "./application/get-roadmap-by-id.use-case";
import { GetRoadmapByTitleUseCase } from "./application/get-roadmap-by-title.usecase";
import { RemoveRoadmapUseCase } from "./application/remove-roadmap.use-case";
import { UpdateRoadmapUseCase } from "./application/update-roadmap.use-case";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Roadmap.name, schema: RoadmapSchema },
    ]),
  ],
  controllers: [RoadmapRestApiAdapter],
  providers: [
    //------------------------
    GetRoadmapByTitleUseCase,
    {
      provide: "GetRoadmapByTitleRepositoryPort",
      useClass: GetRoadmapByTitleRepositoryAdapter,
    },
    //------------------------
    GetAllRoadmapsUseCase,
    {
      provide: "GetAllRoadmapsRepositoryPort",
      useClass: GetAllRoadmapsRepositoryAdapter,
    },
    //------------------------
    CreateRoadmapUseCase,
    {
      provide: "CreateRoadmapRepositoryPort",
      useClass: CreateRoadmapRepositoryAdapter,
    },
    //------------------------
    UpdateRoadmapUseCase,
    {
      provide: "UpdateRoadmapRepositoryPort",
      useClass: UpdateRoadmapRepositoryAdapter,
    },
    //------------------------
    GetRoadmapByIdUseCase,
    {
      provide: "GetRoadmapByIdRepositoryPort",
      useClass: GetRoadmapByIdRepositoryAdapter,
    },
    //------------------------
    RemoveRoadmapUseCase,
    {
      provide: "RemoveRoadmapRepositoryPort",
      useClass: RemoveRoadmapRepositoryAdapter,
    },
  ],
  exports: [MongooseModule],
})
export class RoadmapModule {}
