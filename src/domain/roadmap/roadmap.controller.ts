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
import { Public } from "../auth/decorator/public.decorator";
import { RBAC } from "../auth/decorator/rbac.decorator";
import { Role } from "../user/entities/user.entity";
import { CreateRoadmapRequestDto } from "./dto/create-roadmap.request.dto";
import { UpdateRoadmapRequestDto } from "./dto/update-roadmap.request.dto";
import { RoadmapService } from "./roadmap.service";

@Controller("roadmap")
export class RoadmapController {
  constructor(
    private readonly roadmapService: RoadmapService,
  ) {}

  @Post()
  @RBAC(Role.admin)
  async createRoadmap(
    @Body()
    createRoadmapRequestDto: CreateRoadmapRequestDto,
  ) {
    return this.roadmapService.createRoadmap(
      createRoadmapRequestDto,
    );
  }

  @Patch(":id")
  @RBAC(Role.admin)
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
  @RBAC(Role.admin)
  async getRoadmapById(@Param("id") id: string) {
    return this.roadmapService.getRoadmapById(id);
  }

  @Get("title/:title")
  @Public()
  async getRoadmapByTitle(@Param("title") title: string) {
    return this.roadmapService.getRoadmapByTitle(title);
  }

  @Get()
  @Public()
  async getAllRoadmaps() {
    return this.roadmapService.getAllRoadmaps();
  }

  @Delete(":id")
  @RBAC(Role.admin)
  async remove(@Param("id") id: string) {
    return this.roadmapService.remove(
      new Types.ObjectId(id),
    );
  }
}
