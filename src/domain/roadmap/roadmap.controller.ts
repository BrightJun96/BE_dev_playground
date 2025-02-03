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
import { CreateRoadmapRequestDto } from "./dto/create-roadmap.request.dto";
import { UpdateRoadmapRequestDto } from "./dto/update-roadmap.request.dto";
import { RoadmapService } from "./roadmap.service";

@Controller("roadmap")
export class RoadmapController {
  constructor(
    private readonly roadmapService: RoadmapService,
  ) {}

  @Post()
  async createRoadmap(
    @Body()
    createRoadmapRequestDto: CreateRoadmapRequestDto,
  ) {
    return this.roadmapService.createRoadmap(
      createRoadmapRequestDto,
    );
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body()
    updateRoadmapRequestDto: UpdateRoadmapRequestDto,
  ) {
    return this.roadmapService.update(
      new Types.ObjectId(id),
      updateRoadmapRequestDto,
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
