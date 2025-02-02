import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { QueryRunner as QR } from "typeorm";
import { QueryRunner } from "../../shared/decorator/query-runner.decorator";
import { TransactionInterceptor } from "../../shared/interceptor/transaction.interceptor";
import { Public } from "../auth/decorator/public.decorator";
import { RBAC } from "../auth/decorator/rbac.decorator";
import { Role } from "../user/entities/user.entity";
import { CreateConceptRequestDto } from "./dto/request/create-concept.request.dto";
import { UpdateConceptRequestDto } from "./dto/request/update-concept.request.dto";
import { GetConceptSharedDto } from "./dto/shared/get-concept.shared.dto";
import { ConceptService } from "./service/concept.service";
import { CreateConceptService } from "./service/create-concept.service";
import { UpdateConceptService } from "./service/update-concept.service";

@Controller("concept")
@ApiTags("개발 개념")
export class ConceptController {
  constructor(
    private readonly conceptService: ConceptService,
    private readonly createConceptService: CreateConceptService,
    private readonly updateConceptService: UpdateConceptService,
  ) {}

  /**
   * ---------------------------------------------------------------------------------------------------------
   * 사용자
   */
  @Get()
  @Public()
  @ApiOperation({
    description: "사용자-개념 목록",
  })
  @ApiResponse({
    status: 201,
    type: [GetConceptSharedDto],
  })
  findAll() {
    return this.conceptService.findAll();
  }

  // 상세-URL
  @Get("url/:url")
  @Public()
  @ApiOperation({
    description: "사용자-상세",
  })
  @ApiResponse({
    status: 201,
    type: GetConceptSharedDto,
  })
  findDetailByUrl(@Param("url") url: string) {
    return this.conceptService.findOneByUrl(url);
  }

  /**
   * ---------------------------------------------------------------------------------------------------------
   * 관리자
   */
  @Post()
  // @RBAC(Role.admin)
  @Public()
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    description: "관리자-개념 생성",
  })
  create(
    @Body() createConceptDto: CreateConceptRequestDto,
    @QueryRunner() qr: QR,
  ) {
    return this.createConceptService.create(
      createConceptDto,
      qr,
    );
  }

  @Patch(":id")
  // @RBAC(Role.admin)
  @Public()
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    description: "관리자-개념 수정",
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateConceptDto: UpdateConceptRequestDto,
    @QueryRunner() qr: QR,
  ) {
    return this.updateConceptService.update(
      id,
      updateConceptDto,
      qr,
    );
  }

  @Get(":id")
  // @RBAC(Role.admin)
  @Public()
  @ApiOperation({
    description: "관리자-개념 상세 조회",
  })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.conceptService.findOne(id);
  }

  @Delete(":id")
  @RBAC(Role.admin)
  @ApiOperation({
    description: "관리자-개념 삭제",
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.conceptService.remove(id);
  }
}
