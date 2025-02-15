import {
  BadRequestException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { DeleteResponseDto } from "../../../shared/dto/delete.response.dto";
import { GetConceptListRequestDto } from "../dto/request/get-concept-list.request.dto";
import { ManageConceptRepositoryPort } from "../port/output/manage-concept.repository.port";

@Injectable()
export class ManageConceptUseCase {
  constructor(
    @Inject("ManageConceptRepositoryPort")
    private readonly manageConceptRepositoryPort: ManageConceptRepositoryPort,
  ) {}

  async findAll(
    getConceptListRequestDto: GetConceptListRequestDto,
  ) {
    return await this.manageConceptRepositoryPort.findAll(
      getConceptListRequestDto,
    );
  }

  async findOne(id: number) {
    const concept =
      await this.manageConceptRepositoryPort.findOne(id);

    if (!concept) {
      throw new BadRequestException(
        "존재하지 않는 데이터입니다.",
      );
    }

    return concept;
  }

  async findOneByUrl(url: string) {
    const concept =
      await this.manageConceptRepositoryPort.findOneByUrl(
        url,
      );
    if (!concept) {
      throw new BadRequestException(
        "존재하지 않는 데이터입니다.",
      );
    }

    return concept;
  }

  async remove(id: number): Promise<DeleteResponseDto> {
    return {
      removeStatus:
        await this.manageConceptRepositoryPort.remove(id),
    };
  }
}
