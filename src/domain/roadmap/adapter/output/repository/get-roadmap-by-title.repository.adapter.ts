import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoadmapDomain } from "../../../domain/roadmap.domain";
import { GetRoadmapByTitleRepositoryPort } from "../../../port/output/get-roadmap-by-title.repository.port";
import {
  Roadmap,
  RoadmapDocument,
} from "../mongoose/schema/roadmap.scheme";

export class GetRoadmapByTitleRepositoryAdapter
  implements GetRoadmapByTitleRepositoryPort
{
  constructor(
    @InjectModel(Roadmap.name)
    private roadmapModel: Model<RoadmapDocument>,
  ) {}

  async getRoadmapByTitle(
    title: string,
  ): Promise<RoadmapDomain> {
    const roadmap = await this.roadmapModel
      .findOne({
        title,
      })
      .populate("children")
      .exec();

    if (!roadmap) {
      throw new BadRequestException(
        "해당 로드맵은 존재하지 않습니다.",
      );
    }

    return await this.populateChildren(roadmap);
  }

  async populateChildren(
    roadmap: any,
  ): Promise<RoadmapDomain> {
    if (
      !roadmap ||
      !roadmap.children ||
      roadmap.children.length === 0
    ) {
      return roadmap;
    }

    roadmap.children = await this.roadmapModel
      .find({ _id: { $in: roadmap.children } })
      .populate("children")
      .lean() // lean() 적용하여 성능 향상
      .exec();

    roadmap.children = await Promise.all(
      roadmap.children.map(
        async (child) => await this.populateChildren(child),
      ),
    );

    return roadmap;
  }
}
