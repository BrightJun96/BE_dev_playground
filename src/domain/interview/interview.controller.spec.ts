import { Test, TestingModule } from "@nestjs/testing";
import { InterviewController } from "./interview.controller";
import { InterviewService } from "./service/interview.service";

describe("InterviewController", () => {
  let controller: InterviewController;

  beforeEach(async () => {
    const module: TestingModule =
      await Test.createTestingModule({
        controllers: [InterviewController],
        providers: [InterviewService],
      }).compile();

    controller = module.get<InterviewController>(
      InterviewController,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
