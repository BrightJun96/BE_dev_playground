import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InterviewMetadata } from "./entities/interview-metadata.entity";
import { Interview } from "./entities/interview.entity";
import { InterviewController } from "./interview.controller";
import { CreateInterviewService } from "./service/create-interview.service";
import { InterviewService } from "./service/interview.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Interview,
      InterviewMetadata,
    ]),
  ],
  controllers: [InterviewController],
  providers: [InterviewService, CreateInterviewService],
})
export class InterviewModule {}
