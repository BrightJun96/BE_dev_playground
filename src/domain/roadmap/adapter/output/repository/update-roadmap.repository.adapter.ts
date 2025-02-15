import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoadmapDomain } from "../../../domain/roadmap.domain";
import { UpdateRoadmapRequestDto } from "../../../dto/update-roadmap.request.dto";
import { UpdateRoadmapRepositoryPort } from "../../../port/output/update-roadmap.repository.port";
import { roadmapDocToDomain } from "../mapper/roadmap.mapper";
import {
  Roadmap,
  RoadmapDocument,
} from "../mongoose/schema/roadmap.scheme";

export class UpdateRoadmapRepositoryAdapter
  implements UpdateRoadmapRepositoryPort
{
  constructor(
    @InjectModel(Roadmap.name)
    private readonly roadmapModel: Model<RoadmapDocument>,
  ) {}

  async update(
    id: string,
    updateRoadmapRequestDto: UpdateRoadmapRequestDto,
  ): Promise<RoadmapDomain> {
    await this.findOneById(id);

    const roadmapDoc =
      await this.roadmapModel.findByIdAndUpdate(
        id,
        { $set: updateRoadmapRequestDto },
        { new: true, useFindAndModify: false }, //  업데이트 후 최신 데이터 반환
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
