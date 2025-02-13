import { Test, TestingModule } from "@nestjs/testing";
import { QuizUsecase } from "./quiz.usecase";

describe("QuizService", () => {
  let service: QuizUsecase;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        providers: [QuizUsecase],
      }).compile();

    service = module.get<QuizUsecase>(QuizUsecase);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
