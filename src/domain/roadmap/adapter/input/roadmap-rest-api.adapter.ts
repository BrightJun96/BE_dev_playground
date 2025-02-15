import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Public } from "../../../auth/decorator/public.decorator";
import { RBAC } from "../../../auth/decorator/rbac.decorator";
import { Role } from "../../../user/entities/user.entity";
import { CreateRoadmapUseCase } from "../../application/create-roadmap.use-case";
import { GetAllRoadmapsUseCase } from "../../application/get-all-roadmaps.usecase";
import { GetRoadmapByIdUseCase } from "../../application/get-roadmap-by-id.use-case";
import { GetRoadmapByTitleUseCase } from "../../application/get-roadmap-by-title.usecase";
import { RemoveRoadmapUseCase } from "../../application/remove-roadmap.use-case";
import { UpdateRoadmapUseCase } from "../../application/update-roadmap.use-case";
import { CreateRoadmapRequestDto } from "../../dto/create-roadmap.request.dto";
import { UpdateRoadmapRequestDto } from "../../dto/update-roadmap.request.dto";
import { RoadmapUseCasePort } from "../../port/input/roadmap-use-case.port";

@Controller("roadmap")
export class RoadmapRestApiAdapter
  implements RoadmapUseCasePort
{
  constructor(
    private readonly getRoadmapByTitleUseCase: GetRoadmapByTitleUseCase,
    private readonly getAllRoadmapsUseCase: GetAllRoadmapsUseCase,
    private readonly getRoadmapByIdUseCase: GetRoadmapByIdUseCase,
    private readonly createRoadmapUseCase: CreateRoadmapUseCase,
    private readonly updateRoadmapUseCase: UpdateRoadmapUseCase,
    private readonly removeRoadmapUseCase: RemoveRoadmapUseCase,
  ) {}

  /**
   * 사용자
   */
  @Get("title/:title")
  @Public()
  async getRoadmapByTitle(@Param("title") title: string) {
    return this.getRoadmapByTitleUseCase.execute(title);
  }

  @Get()
  @Public()
  async getAllRoadmaps() {
    return this.getAllRoadmapsUseCase.execute();
  }

  /**
   *
   * -------------------------------------------------------
   * 관리자
   */
  @Post()
  @RBAC(Role.admin)
  async createRoadmap(
    @Body()
    createRoadmapRequestDto: CreateRoadmapRequestDto,
  ) {
    return this.createRoadmapUseCase.execute(
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
    return this.updateRoadmapUseCase.execute(
      id,
      updateRoadmapRequestDto,
    );
  }

  @Get(":id")
  @RBAC(Role.admin)
  async getRoadmapById(@Param("id") id: string) {
    return this.getRoadmapByIdUseCase.execute(id);
  }

  @Delete(":id")
  @RBAC(Role.admin)
  async remove(@Param("id") id: string) {
    return this.removeRoadmapUseCase.execute(id);
  }
}
