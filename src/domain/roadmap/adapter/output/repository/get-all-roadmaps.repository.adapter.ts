import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GetAllRoadmapsRepositoryPort } from "../../../port/output/get-all-roadmaps.repository.port";
import {
  Roadmap,
  RoadmapDocument,
} from "../mongoose/schema/roadmap.scheme";

export class GetAllRoadmapsRepositoryAdapter
  implements GetAllRoadmapsRepositoryPort
{
  constructor(
    @InjectModel(Roadmap.name)
    private roadmapModel: Model<RoadmapDocument>,
  ) {}

  async getAllRoadmaps(): Promise<any[]> {
    return await this.roadmapModel
      .find({ parent: null })
      // .populate("children")
      .lean()
      .exec();
  }
}
