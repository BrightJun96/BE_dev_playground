import { QuizDomain } from "../../domain/quiz.domain";
import { UpdateMultipleChoiceRequestDto } from "../../dto/request/update-multiple-choice.request.dto";
import { UpdateQuizMetaDataRequestDto } from "../../dto/request/update-quiz-meta-data.request.dto";
import { UpdateQuizRequestDto } from "../../dto/request/update-quiz.request.dto";

export interface UpdateQuizRepositoryPort {
  updateQuiz(
    quizId: number,
    updateDto: UpdateQuizRequestDto,
  ): Promise<void>;

  updateMetaData(
    metaId: number,
    updateMetaDto: UpdateQuizMetaDataRequestDto,
  ): Promise<void>;
  updateMultipleChoices(
    choicesDto: UpdateMultipleChoiceRequestDto[],
  ): Promise<void>;

  findOneById(id: number): Promise<QuizDomain>;
}
