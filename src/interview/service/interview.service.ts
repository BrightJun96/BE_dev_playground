import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateInterviewDto } from "../dto/request/update-interview.dto";
import { Interview } from "../entities/interview.entity";

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
  ) {}

  findAll() {
    return this.interviewRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} interview`;
  }

  update(
    id: number,
    updateInterviewDto: UpdateInterviewDto,
  ) {
    return `This action updates a #${id} interview`;
  }

  remove(id: number) {
    return `This action removes a #${id} interview`;
  }
}
