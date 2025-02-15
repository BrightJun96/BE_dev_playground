import {
  BadRequestException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { TransactionManagerPort } from "../../../shared/transaction/port/transaction-manager.port";
import { CreateConceptRequestDto } from "../dto/request/create-concept.request.dto";
import { CreateConceptRepositoryPort } from "../port/output/create-concept.repository.port";

@Injectable()
export class CreateConceptUseCase {
  constructor(
    @Inject("CreateConceptRepositoryPort")
    private readonly conceptRepositoryPort: CreateConceptRepositoryPort,
    @Inject("TransactionManagerPort")
    private readonly transactionManagerPort: TransactionManagerPort,
  ) {}

  async execute(createConceptDto: CreateConceptRequestDto) {
    const duplicateOne =
      await this.conceptRepositoryPort.findByDetailUrl(
        createConceptDto.detailUrl,
      );

    if (duplicateOne) {
      throw new BadRequestException(
        "detailUrl은 중복되면 안됩니다.",
      );
    }

    return await this.transactionManagerPort.runInTransaction(
      async () => {
        const meta =
          await this.conceptRepositoryPort.createMeta(
            createConceptDto.metaData,
          );

        return await this.conceptRepositoryPort.createConcept(
          createConceptDto,
          meta,
        );
      },
    );
  }
}
