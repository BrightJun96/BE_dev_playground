import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InterviewMetadata } from "./entities/interview-metadata.entity";
import { Interview } from "./entities/interview.entity";
import { InterviewController } from "./interview.controller";
import { InterviewService } from "./service/interview.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Interview,
      InterviewMetadata,
    ]),
  ],
  controllers: [InterviewController],
  providers: [InterviewService],
})
export class InterviewModule {}
