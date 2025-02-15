import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { TransactionInterceptor } from "../../../../shared/interceptor/transaction.interceptor";
import { Public } from "../../../auth/decorator/public.decorator";
import { RBAC } from "../../../auth/decorator/rbac.decorator";
import { Role } from "../../../user/entities/user.entity";
import { CreateConceptUseCase } from "../../application/create-concept.use-case";
import { ManageConceptUseCase } from "../../application/manage-concept.use-case";
import { UpdateConceptUseCase } from "../../application/update-concept.use-case";
import { CreateConceptRequestDto } from "../../dto/request/create-concept.request.dto";
import { GetConceptListRequestDto } from "../../dto/request/get-concept-list.request.dto";
import { UpdateConceptRequestDto } from "../../dto/request/update-concept.request.dto";
import { GetConceptSharedDto } from "../../dto/shared/get-concept.shared.dto";
import { ConceptUseCasePort } from "../../port/input/concept-use-case.port";

@Controller("concept")
@ApiTags("개발 개념")
export class ConceptRestApiControllerAdapter
  implements ConceptUseCasePort
{
  constructor(
    private readonly conceptService: ManageConceptUseCase,
    private readonly createConceptService: CreateConceptUseCase,
    private readonly updateConceptService: UpdateConceptUseCase,
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
  findAll(
    @Query()
    getConceptListRequestDto: GetConceptListRequestDto,
  ) {
    return this.conceptService.findAll(
      getConceptListRequestDto,
    );
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
  @RBAC(Role.admin)
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    description: "관리자-개념 생성",
  })
  create(
    @Body() createConceptDto: CreateConceptRequestDto,
  ) {
    return this.createConceptService.execute(
      createConceptDto,
    );
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
    return this.updateConceptService.execute(
      id,
      updateConceptDto,
    );
  }

  @Get(":id")
  @RBAC(Role.admin)
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
