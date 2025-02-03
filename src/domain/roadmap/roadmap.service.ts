import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateRoadmapRequestDto } from "./dto/create-roadmap.request.dto";
import { UpdateRoadmapRequestDto } from "./dto/update-roadmap.request.dto";
import {
  Roadmap,
  RoadmapDocument,
} from "./schema/roadmap.scheme";

@Injectable()
export class RoadmapService {
  constructor(
    @InjectModel(Roadmap.name)
    private roadmapModel: Model<RoadmapDocument>, // MongoDB 모델 주입
  ) {}

  async createRoadmap(
    createRoadmapRequestDto: CreateRoadmapRequestDto,
  ) {
    const { title, parentId, link } =
      createRoadmapRequestDto;
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
    return roadmap;
  }

  async getRoadmapById(id: string) {
    return this.roadmapModel
      .findById(id)
      .populate("children")
      .exec();
  }

  async getAllRoadmaps() {
    return this.roadmapModel
      .find()
      .populate("children")
      .exec();
  }

  async updateChildren(
    parentId: Types.ObjectId,
    childId: Types.ObjectId,
  ) {
    await this.roadmapModel.findByIdAndUpdate(
      parentId,
      { $push: { children: childId } }, // children 배열에 새 항목 추가
      { new: true, useFindAndModify: false }, // 최신 데이터 반환, 업데이트 방식 설정
    );
  }

  async update(
    id: Types.ObjectId,
    updateRoadmapRequestDto: UpdateRoadmapRequestDto,
  ) {
    return this.roadmapModel.findByIdAndUpdate(
      id,
      { $set: updateRoadmapRequestDto },
      { new: true, useFindAndModify: false }, //  업데이트 후 최신 데이터 반환
    );
  }

  async remove(id: Types.ObjectId) {
    return this.roadmapModel.findByIdAndDelete(id);
  }
}
