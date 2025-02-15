import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoadmapDomain } from "../../../domain/roadmap.domain";
import { GetRoadmapByIdRepositoryPort } from "../../../port/output/get-roadmap-by-id.repository.port";
import { roadmapDocToDomain } from "../mapper/roadmap.mapper";
import {
  Roadmap,
  RoadmapDocument,
} from "../mongoose/schema/roadmap.scheme";

export class GetRoadmapByIdRepositoryAdapter
  implements GetRoadmapByIdRepositoryPort
{
  constructor(
    @InjectModel(Roadmap.name)
    private readonly roadmapModel: Model<RoadmapDocument>,
  ) {}

  async getRoadmapById(id: string): Promise<RoadmapDomain> {
    const roadmapDoc = await this.roadmapModel
      .findById(id)
      .populate("children")
      .exec();

    return roadmapDocToDomain(roadmapDoc);
  }
}
