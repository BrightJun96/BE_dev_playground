import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InterviewMetadata } from "./entities/interview-metadata.entity";
import { Interview } from "./entities/interview.entity";
import { InterviewController } from "./interview.controller";
import { CreateInterviewService } from "./service/create-interview.service";
import { InterviewService } from "./service/interview.service";
import { UpdateInterviewService } from "./service/update-interview.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Interview,
      InterviewMetadata,
    ]),
  ],
  controllers: [InterviewController],
  providers: [
    InterviewService,
    CreateInterviewService,
    UpdateInterviewService,
  ],
})
export class InterviewModule {}
