import {
  BadRequestException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { TransactionManagerPort } from "../../../shared/transaction/port/transaction-manager.port";
import { ConceptDomain } from "../domain/concept.domain";
import { UpdateConceptRequestDto } from "../dto/request/update-concept.request.dto";
import { UpdateConceptRepositoryPort } from "../port/output/update-concept.repository.port";

@Injectable()
export class UpdateConceptUseCase {
  constructor(
    @Inject("UpdateConceptRepositoryPort")
    private readonly conceptRepository: UpdateConceptRepositoryPort,

    @Inject("TransactionManagerPort")
    private readonly transactionManager: TransactionManagerPort,
  ) {}

  async execute(
    id: number,
    updateConceptDto: UpdateConceptRequestDto,
  ): Promise<ConceptDomain> {
    const existingConcept =
      await this.conceptRepository.findById(id);

    if (!existingConcept) {
      throw new BadRequestException(
        "존재하지 않는 데이터입니다.",
      );
    }

    return await this.transactionManager.runInTransaction(
      async () => {
        if (updateConceptDto.metaData) {
          await this.conceptRepository.updateMeta(
            existingConcept.getConceptMeta().getId(),
            updateConceptDto.metaData,
          );
        }

        await this.conceptRepository.updateConcept(
          id,
          updateConceptDto,
        );

        return this.conceptRepository.findById(id);
      },
    );
  }
}
