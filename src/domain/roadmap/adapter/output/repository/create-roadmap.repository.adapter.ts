import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { RoadmapDomain } from "../../../domain/roadmap.domain";
import { CreateRoadmapRequestDto } from "../../../dto/create-roadmap.request.dto";
import { CreateRoadmapRepositoryPort } from "../../../port/output/create-roadmap.repository.port";
import { roadmapDocToDomain } from "../mapper/roadmap.mapper";
import {
  Roadmap,
  RoadmapDocument,
} from "../mongoose/schema/roadmap.scheme";

export class CreateRoadmapRepositoryAdapter
  implements CreateRoadmapRepositoryPort
{
  constructor(
    @InjectModel(Roadmap.name)
    private readonly roadmapModel: Model<RoadmapDocument>,
  ) {}

  async createRoadmap(
    createRoadmapRequestDto: CreateRoadmapRequestDto,
  ): Promise<RoadmapDomain> {
    const { title, parentId, link } =
      createRoadmapRequestDto;

    const duplicateOne = await this.roadmapModel.findOne({
      title,
    });

    if (duplicateOne) {
      throw new BadRequestException(
        "이미 존재하는 데이터입니다.",
      );
    }

    const roadmap = new this.roadmapModel({
      title,
      link,
      parent: parentId || null,
    });
    await roadmap.save();

    // 부모 노드의 children 필드 업데이트
    if (parentId) {
      await this.updateChildren(
        new Types.ObjectId(parentId),
        roadmap._id,
      );
    }
    return roadmapDocToDomain(roadmap);
  }

  async updateChildren(
    parentId: Types.ObjectId,
    childId: Types.ObjectId,
  ): Promise<void> {
    await this.roadmapModel.findByIdAndUpdate(
      parentId,
      { $push: { children: childId } }, // children 배열에 새 항목 추가
      { new: true, useFindAndModify: false }, // 최신 데이터 반환, 업데이트 방식 설정
    );
  }
}
