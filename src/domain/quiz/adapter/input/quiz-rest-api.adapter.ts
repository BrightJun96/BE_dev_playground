import { CacheInterceptor } from "@nestjs/cache-manager";
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
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { TransactionInterceptor } from "../../../../shared/interceptor/transaction.interceptor";
import { Public } from "../../../auth/decorator/public.decorator";
import { RBAC } from "../../../auth/decorator/rbac.decorator";
import { Role } from "../../../user/entities/user.entity";
import { CheckAnswerUsecase } from "../../application/check-answer.usecase";
import { CreateQuizUsecase } from "../../application/create-quiz.usecase";
import { DeleteQuizUsecase } from "../../application/delete-quiz.usecase";
import { FindQuizByIdUsecase } from "../../application/find-quiz-by-id.usecase";
import { FindQuizByUrlUsecase } from "../../application/find-quiz-by-url.usecase";
import { GetQuizUrlsUsecase } from "../../application/get-quiz-urls.usecase";
import { QuizListUsecase } from "../../application/quiz-list.usecase";
import { UpdateQuizUsecase } from "../../application/update-quiz.usecase";
import { CheckAnswerRequestDto } from "../../dto/request/check-answer.request.dto";
import { CreateQuizRequestDto } from "../../dto/request/create-quiz.request.dto";
import { GetQuizListRequestDto } from "../../dto/request/get-quiz-list.request.dto";
import { UpdateQuizRequestDto } from "../../dto/request/update-quiz.request.dto";
import { CheckAnswerResponseDto } from "../../dto/response/check-answer.response.dto";
import { DeleteQuizResponseDto } from "../../dto/response/delete-quiz.response.dto";
import { GetQuizListResponseDto } from "../../dto/response/get-quiz-list.response.dto";
import { QuizDetailURLResponseDto } from "../../dto/response/get-quiz-url.response.dto";
import { GetQuizSharedDto } from "../../dto/shared/get-quiz.shared.dto";
import { QuizUseCasePort } from "../../port/input/quiz-use-case.port";

@Controller("quiz")
@ApiTags("퀴즈")
export class QuizRestApiAdapter implements QuizUseCasePort {
  constructor(
    private readonly createQuizUsecase: CreateQuizUsecase,
    private readonly updateQuizUsecase: UpdateQuizUsecase,
    private readonly quizListUsecase: QuizListUsecase,
    private readonly findQuizByIdUsecase: FindQuizByIdUsecase,
    private readonly findQuizByUrlUsecase: FindQuizByUrlUsecase,
    private readonly getQuizUrlsUsecase: GetQuizUrlsUsecase,
    private readonly deleteQuizUsecase: DeleteQuizUsecase,
    private readonly checkAnswerUsecase: CheckAnswerUsecase,
  ) {}

  /**
   * ------------------------------
   * 사용자
   * ------------------------------
   */

  /**
   * 퀴즈 상세 - URL
   */
  @Get("detail-url/:detailUrl")
  @Public()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    description: "퀴즈 상세 조회 BY URL",
  })
  @ApiParam({
    name: "detailUrl",
    type: String,
    description: "URL 경로 파라미터",
    example: "next",
  })
  @ApiResponse({
    status: 200,
    type: GetQuizSharedDto,
  })
  async findOneByUrl(
    @Param("detailUrl") url: string,
  ): Promise<GetQuizSharedDto> {
    return await this.findQuizByUrlUsecase.execute(url);
  }

  /**
   * 퀴즈 URL 목록
   */
  @Get("detail-urls")
  @Public()
  @UseInterceptors(CacheInterceptor)
  @ApiOperation({
    description: "퀴즈 DETAIL URL 목록",
  })
  @ApiResponse({
    status: 200,
    type: [QuizDetailURLResponseDto],
  })
  async findDetailUrls(): Promise<
    QuizDetailURLResponseDto[]
  > {
    console.log("퀴즈 DETAIL URL 목록");
    return await this.getQuizUrlsUsecase.execute();
  }

  /**
   * 정답 확인
   */
  @Post("check-answer")
  @Public()
  @ApiOperation({
    description: "퀴즈 정답 확인",
  })
  @ApiResponse({
    status: 201,
    type: CheckAnswerResponseDto,
  })
  async checkAnswer(
    @Body() checkAnswerRequestDto: CheckAnswerRequestDto,
  ): Promise<CheckAnswerResponseDto> {
    return await this.checkAnswerUsecase.execute(
      checkAnswerRequestDto,
    );
  }

  /**
   * ------------------------------
   * 관리자
   * ------------------------------
   */

  /**
   * 퀴즈 목록
   */
  @Get()
  @Public()
  @RBAC(Role.admin)
  @ApiOperation({
    description: "관리자-퀴즈 목록",
  })
  @ApiResponse({
    status: 200,
    type: GetQuizListResponseDto,
  })
  async findAll(
    @Query() getQuizListDto: GetQuizListRequestDto,
  ): Promise<GetQuizListResponseDto> {
    return await this.quizListUsecase.findAll(
      getQuizListDto,
    );
  }

  /**
   * 퀴즈 생성
   */
  @Post()
  @RBAC(Role.admin)
  @Public()
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    description: "관리자-퀴즈 생성",
  })
  @ApiResponse({
    status: 200,
    type: GetQuizSharedDto,
  })
  create(@Body() createQuizDto: CreateQuizRequestDto) {
    return this.createQuizUsecase.execute(createQuizDto);
  }

  /**
   * 수정
   */
  @Patch(":id")
  @RBAC(Role.admin)
  @Public()
  @UseInterceptors(TransactionInterceptor)
  @ApiOperation({
    description: "관리자-퀴즈 수정",
  })
  @ApiResponse({
    status: 200,
    type: GetQuizSharedDto,
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateQuizDto: UpdateQuizRequestDto,
  ): Promise<GetQuizSharedDto> {
    return this.updateQuizUsecase.execute(
      id,
      updateQuizDto,
    );
  }

  /**
   * 퀴즈 상세
   */
  @Get(":id")
  @RBAC(Role.admin)
  @Public()
  @ApiOperation({
    description: "관리자-퀴즈 상세",
  })
  @ApiResponse({
    status: 200,
    type: GetQuizSharedDto,
  })
  async findOneById(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<GetQuizSharedDto> {
    return await this.findQuizByIdUsecase.execute(id);
  }
  /**
   * 퀴즈 삭제
   */
  @Delete(":id")
  @RBAC(Role.admin)
  @Public()
  @ApiOperation({
    description: "관리자-퀴즈 삭제",
  })
  @ApiResponse({
    status: 200,
    type: DeleteQuizResponseDto,
  })
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<DeleteQuizResponseDto> {
    return await this.deleteQuizUsecase.execute(id);
  }
}
