import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Types } from "mongoose";
import { RoadmapService } from "./roadmap.service";

@Controller("roadmap")
export class RoadmapController {
  constructor(
    private readonly roadmapService: RoadmapService,
  ) {}

  @Post()
  async createRoadmap(
    @Body() body: { title: string; parentId?: string },
  ) {
    return this.roadmapService.createRoadmap(
      body.title,
      body.parentId
        ? new Types.ObjectId(body.parentId)
        : undefined,
    );
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body("title")
    title: string,
  ) {
    return this.roadmapService.update(
      new Types.ObjectId(id),
      title,
    );
  }

  @Get(":id")
  async getRoadmapById(@Param("id") id: string) {
    return this.roadmapService.getRoadmapById(id);
  }

  @Get()
  async getAllRoadmaps() {
    return this.roadmapService.getAllRoadmaps();
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.roadmapService.remove(
      new Types.ObjectId(id),
    );
  }
}
