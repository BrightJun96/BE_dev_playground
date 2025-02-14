import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { RoadmapDomain } from "../../../domain/roadmap.domain";
import { RemoveRoadmapRepositoryPort } from "../../../port/output/remove-roadmap.repository.port";
import { roadmapDocToDomain } from "../mapper/roadmap.mapper";
import {
  Roadmap,
  RoadmapDocument,
} from "../mongoose/schema/roadmap.scheme";

export class RemoveRoadmapRepositoryAdapter
  implements RemoveRoadmapRepositoryPort
{
  constructor(
    @InjectModel(Roadmap.name)
    private readonly roadmapModel: Model<RoadmapDocument>,
  ) {}

  async remove(id: string): Promise<RoadmapDomain> {
    await this.findOneById(id);

    const roadmapDoc =
      await this.roadmapModel.findOneAndDelete(
        new Types.ObjectId(id),
      );

    return roadmapDocToDomain(roadmapDoc);
  }

  async findOneById(id: string) {
    const roadmap = await this.roadmapModel.findOne({
      id,
    });

    if (!roadmap) {
      throw new BadRequestException(
        "존재하지 않는 로드맵입니다.",
      );
    }
  }
}
