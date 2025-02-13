import { Test, TestingModule } from "@nestjs/testing";
import { QuizUsecase } from "../../application/quiz.usecase";
import { QuizRestApiAdapter } from "./quiz-rest-api.adapter";

describe("QuizController", () => {
  let controller: QuizRestApiAdapter;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [QuizRestApiAdapter],
        providers: [QuizUsecase],
      }).compile();

    controller = module.get<QuizRestApiAdapter>(
      QuizRestApiAdapter,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
