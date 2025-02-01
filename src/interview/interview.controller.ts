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
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { QueryRunner as QR } from "typeorm";
import { Public } from "../auth/decorator/public.decorator";
import { RBAC } from "../auth/decorator/rbac.decorator";
import { QueryRunner } from "../shared/decorator/query-runner.decorator";
import { ListSharedResponseDto } from "../shared/dto/list.shared.response.dto";
import { TransactionInterceptor } from "../shared/interceptor/transaction.interceptor";
import { Role } from "../user/entities/user.entity";
import { CreateInterviewDto } from "./dto/request/create-interview.dto";
import { UpdateInterviewDto } from "./dto/request/update-interview.dto";
import { GetInterviewSharedDto } from "./dto/shared/get-interview.shared.dto";
import { CreateInterviewService } from "./service/create-interview.service";
import { InterviewService } from "./service/interview.service";

@Controller("interview")
export class InterviewController {
  constructor(
    private readonly interviewService: InterviewService,
    private readonly createInterviewService: CreateInterviewService,
  ) {}

  /**
   * ---------------------------------------------------------------------------------------------------------
   * 사용자
   */
  @Get()
  @Public()
  @ApiOperation({
    description: "사용자-인터뷰 목록",
  })
  @ApiResponse({
    status: 201,
    type: ListSharedResponseDto<GetInterviewSharedDto>,
  })
  findAll() {
    return this.interviewService.findAll();
  }

  /**
   * ---------------------------------------------------------------------------------------------------------
   * 관리자
   */

  // 상세 조회
  @Get(":id")
  @RBAC(Role.admin)
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    description: "관리자-인터뷰 상세 조회",
  })
  @ApiResponse({
    status: 201,
    type: GetInterviewSharedDto,
  })
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.interviewService.findOne(id);
  }

  // 인터뷰 데이터 생성
  @Post()
  @RBAC(Role.admin)
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    description: "관리자-인터뷰 생성",
  })
  @ApiResponse({
    status: 201,
    type: GetInterviewSharedDto,
  })
  create(
    @Body() createInterviewDto: CreateInterviewDto,
    @QueryRunner() qr: QR,
  ) {
    return this.createInterviewService.create(
      createInterviewDto,
      qr,
    );
  }

  // 인터뷰 데이터 수정
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateInterviewDto: UpdateInterviewDto,
  ) {
    return this.interviewService.update(
      +id,
      updateInterviewDto,
    );
  }

  // 인터뷰 데이터 삭제
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.interviewService.remove(+id);
  }
}
