/**
 * Entity를 Domain 객체로 변환해주는 역할을 해야함.
 * 서비스단에서 요구하는 것은 Domain객체임
 */
import { MultipleChoiceDomain } from "../../../../domain/multiple-choice.domain";
import { QuizMetaDataDomain } from "../../../../domain/quiz-meta-data.domain";
import { QuizDomain } from "../../../../domain/quiz.domain";
import { MultipleChoice } from "../entities/multiple-choice.entity";
import { QuizMetaData } from "../entities/quiz-meta-data.entity";
import { Quiz } from "../entities/quiz.entity";

/**
 * Quiz Entity → Domain 변환
 */
export function toQuizDomain(entity: Quiz): QuizDomain {
  return new QuizDomain({
    title: entity.title,
    content: entity.content,
    detailUrl: entity.detailUrl,
    field: entity.field,
    explanation: entity.explanation,
    answer: entity.answer,
    // quizMetaData: toQuizMetaDataDomain(entity.quizMetaData),
  });
}

/**
 * QuizMetaData Entity → Domain 변환
 */
export function toQuizMetaDataDomain(
  entity: QuizMetaData,
): QuizMetaDataDomain {
  return new QuizMetaDataDomain({
    seoMetaTitle: entity.seoMetaTitle,
    seoMetaDescription: entity.seoMetaDescription,
    metaImageUrl: entity.metaImageUrl,
  });
}

/**
 * MultipleChoice Entity → Domain 변환
 */
export function toMultipleChoiceDomain(
  entity: MultipleChoice,
): MultipleChoiceDomain {
  return new MultipleChoiceDomain({
    content: entity.content,
  });
}
