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

  async populateChildren(roadmap: any) {
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
  async getRoadmapByTitle(title: string) {
    const roadmap = await this.roadmapModel
      .findOne({
        title,
      })
      .populate("children")
      .exec();

    if (!roadmap) {
      return null;
    }

    return await this.populateChildren(roadmap);
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
