import { GetQuizSharedDto } from "../../dto/shared/get-quiz.shared.dto";

export interface FindQuizByUrlRepositoryPort {
  findOneByUrl(url: string): Promise<GetQuizSharedDto>;
}
