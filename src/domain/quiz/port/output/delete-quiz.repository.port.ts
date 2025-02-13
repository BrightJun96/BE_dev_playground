import { DeleteQuizResponseDto } from "../../dto/response/delete-quiz.response.dto";
import { GetQuizSharedDto } from "../../dto/shared/get-quiz.shared.dto";

export interface DeleteQuizRepositoryPort {
  remove(id: number): Promise<DeleteQuizResponseDto>;
  findOneById(id: number): Promise<GetQuizSharedDto>;
}
