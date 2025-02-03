import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { RoadmapController } from "./roadmap.controller";
import { RoadmapService } from "./roadmap.service";
import {
  Roadmap,
  RoadmapSchema,
} from "./schema/roadmap.scheme";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Roadmap.name, schema: RoadmapSchema },
    ]),
  ],
  controllers: [RoadmapController],
  providers: [RoadmapService],
  exports: [MongooseModule],
})
export class RoadmapModule {}
