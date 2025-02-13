import { Test, TestingModule } from "@nestjs/testing";
import { QuizUsecase } from "../../application/quiz.usecase";
import { QuizRestApiController } from "./quiz-rest-api.controller";

describe("QuizController", () => {
  let controller: QuizRestApiController;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [QuizRestApiController],
        providers: [QuizUsecase],
      }).compile();

    controller = module.get<QuizRestApiController>(
      QuizRestApiController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
