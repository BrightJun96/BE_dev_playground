import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Relations } from "../../shared/const/relation.const";
import { UpdateInterviewDto } from "../dto/request/update-interview.dto";
import { Interview } from "../entities/interview.entity";

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
  ) {}

  findAll() {
    return this.interviewRepository.find({
      relations: [Relations.INTERVIEW.META],
    });
  }

  async findOne(id: number) {
    const interview =
      await this.interviewRepository.findOne({
        relations: [Relations.INTERVIEW.META],
        where: {
          id,
        },
      });

    if (!interview) {
      throw new BadRequestException(
        "존재하지 않는 데이터입니다.",
      );
    }

    return interview;
  }

  update(
    id: number,
    updateInterviewDto: UpdateInterviewDto,
  ) {
    return `This action updates a #${id} interview`;
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.interviewRepository.delete(id);

    return {
      removeStatus: true,
    };
  }
}
