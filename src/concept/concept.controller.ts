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
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { Public } from "../auth/decorator/public.decorator";
import { RBAC } from "../auth/decorator/rbac.decorator";
import { TransactionInterceptor } from "../shared/interceptor/transaction.interceptor";
import { Role } from "../user/entities/user.entity";
import { CreateConceptRequestDto } from "./dto/request/create-concept.request.dto";
import { UpdateConceptRequestDto } from "./dto/request/update-concept.request.dto";
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
  findAll() {
    return this.conceptService.findAll();
  }

  /**
   * ---------------------------------------------------------------------------------------------------------
   * 관리자
   */
  @Post()
  @RBAC(Role.admin)
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    description: "관리자-개념 생성",
  })
  create(
    @Body() createConceptDto: CreateConceptRequestDto,
  ) {
    return this.conceptService.create(createConceptDto);
  }

  @Get(":id")
  @RBAC(Role.admin)
  @ApiOperation({
    description: "관리자-개념 상세 조회",
  })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.conceptService.findOne(id);
  }

  @Patch(":id")
  @RBAC(Role.admin)
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    description: "관리자-개념 수정",
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateConceptDto: UpdateConceptRequestDto,
  ) {
    return this.conceptService.update(id, updateConceptDto);
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
