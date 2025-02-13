import { GetQuizSharedDto } from "../../dto/shared/get-quiz.shared.dto";

export interface FindQuizByIdRepositoryPort {
  findOneById(id: number): Promise<GetQuizSharedDto>;
}
