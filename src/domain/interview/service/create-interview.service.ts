import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryRunner, Repository } from "typeorm";
import { Relations } from "../../../shared/const/relation.const";
import { CreateInterviewMetadataDto } from "../dto/request/create-interview-metadata.dto";
import { CreateInterviewDto } from "../dto/request/create-interview.dto";
import { InterviewMetadata } from "../entities/interview-metadata.entity";
import { Interview } from "../entities/interview.entity";

@Injectable()
export class CreateInterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
  ) {}

  async create(
    createInterviewDto: CreateInterviewDto,
    qr: QueryRunner,
  ) {
    const duplicationOne = await qr.manager.findOne(
      Interview,
      {
        where: {
          detailUrl: createInterviewDto.detailUrl,
        },
      },
    );

    if (duplicationOne) {
      throw new BadRequestException(
        "detailUrl은 중복되면 안됩니다.",
      );
    }

    const metaData = await this.createMetaData(
      createInterviewDto.metaData,
      qr,
    );

    const metaId = metaData.identifiers[0].id;

    const interview = await this.createInterview(
      createInterviewDto,
      metaId,
      qr,
    );

    const interviewId = interview.identifiers[0].id;

    return qr.manager.findOne(Interview, {
      relations: [Relations.INTERVIEW.META],
      where: {
        id: interviewId,
      },
    });
  }

  async createMetaData(
    metaData: CreateInterviewMetadataDto,
    qr: QueryRunner,
  ) {
    return await qr.manager
      .createQueryBuilder()
      .insert()
      .into(InterviewMetadata)
      .values(metaData)
      .execute();
  }

  async createInterview(
    createInterviewDto: CreateInterviewDto,
    metaId: number,
    qr: QueryRunner,
  ) {
    return await qr.manager
      .createQueryBuilder()
      .insert()
      .into(Interview)
      .values({
        title: createInterviewDto.title,
        content: createInterviewDto.content,
        detailUrl: createInterviewDto.detailUrl,
        field: createInterviewDto.field,
        interviewMetaData: { id: metaId },
      })
      .execute();
  }
}
