import {
  BadRequestException,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Relations } from "../../../shared/const/relation.const";
import { DeleteResponseDto } from "../../../shared/dto/delete.response.dto";
import { GetConceptListRequestDto } from "../dto/request/get-concept-list.request.dto";
import { Concept } from "../entities/concept.entity";

@Injectable()
export class ConceptService {
  constructor(
    @InjectRepository(Concept)
    private readonly conceptRepository: Repository<Concept>,
  ) {}

  async findAll(
    getConceptListRequestDto: GetConceptListRequestDto,
  ) {
    const where: any = {};

    if (getConceptListRequestDto.tech) {
      where.tech = getConceptListRequestDto.tech;
    }

    if (getConceptListRequestDto.field) {
      where.field = getConceptListRequestDto.field;
    }

    return await this.conceptRepository.find({
      relations: [Relations.CONCEPT.META],
      where,
    });
  }

  async findOne(id: number) {
    const concept = await this.conceptRepository.findOne({
      where: {
        id,
      },
      relations: [Relations.CONCEPT.META],
    });

    if (!concept) {
      throw new BadRequestException(
        "존재하지 않는 데이터입니다.",
      );
    }

    return concept;
  }

  async findOneByUrl(url: string) {
    const concept = await this.conceptRepository.findOne({
      where: {
        detailUrl: url,
      },
      relations: [Relations.CONCEPT.META],
    });

    if (!concept) {
      throw new BadRequestException(
        "존재하지 않는 데이터입니다.",
      );
    }

    return concept;
  }

  async remove(id: number): Promise<DeleteResponseDto> {
    await this.findOne(id);
    await this.conceptRepository.delete(id);
    return {
      removeStatus: true,
    };
  }
}
