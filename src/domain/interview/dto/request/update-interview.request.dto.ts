import { PartialType } from "@nestjs/swagger";
import { CreateInterviewDto } from "./create-interview.dto";

export class UpdateInterviewRequestDto extends PartialType(
  CreateInterviewDto,
) {}
