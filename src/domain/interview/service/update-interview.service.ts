import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryRunner, Repository } from "typeorm";
import { Relations } from "../../../shared/const/relation.const";
import { UpdateInterviewMetadataRequestDto } from "../dto/request/update-interview-metadata.request.dto";
import { UpdateInterviewRequestDto } from "../dto/request/update-interview.request.dto";
import { InterviewMetadata } from "../entities/interview-metadata.entity";
import { Interview } from "../entities/interview.entity";

@Injectable()
export class UpdateInterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
  ) {}

  async update(
    id: number,
    updateInterviewDto: UpdateInterviewRequestDto,
    qr: QueryRunner,
  ) {
    const interview = await this.findOne(id, qr);

    if (updateInterviewDto.metaData) {
      await this.updateMeta(
        interview.interviewMetaData.id,
        updateInterviewDto.metaData,
        qr,
      );
    }

    await this.updateInterview(id, updateInterviewDto, qr);

    return await this.findOne(id, qr);
  }

  // 메타 데이터 수정
  async updateMeta(
    metaId: number,
    updateInterviewRequestDto: UpdateInterviewMetadataRequestDto,
    qr: QueryRunner,
  ) {
    await qr.manager
      .createQueryBuilder()
      .update(InterviewMetadata)
      .set(updateInterviewRequestDto)
      .where("id=:id", {
        id: metaId,
      })
      .execute();
  }

  // 인터뷰 데이터 조회
  async updateInterview(
    interviewId: number,
    updateInterviewRequestDto: UpdateInterviewRequestDto,
    qr: QueryRunner,
  ) {
    await qr.manager
      .createQueryBuilder()
      .update(Interview)
      .set({
        title: updateInterviewRequestDto.title,
        content: updateInterviewRequestDto.content,
        detailUrl: updateInterviewRequestDto.detailUrl,
        field: updateInterviewRequestDto.field,
      })
      .where("id=:id", {
        id: interviewId,
      })
      .execute();
  }

  // 조회
  async findOne(interviewId: number, qr: QueryRunner) {
    return await qr.manager.findOne(Interview, {
      relations: [Relations.INTERVIEW.META],
      where: {
        id: interviewId,
      },
    });
  }
}
