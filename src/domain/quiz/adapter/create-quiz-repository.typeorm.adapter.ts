import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuizDomain } from "../domain/quiz.domain";
import { MultipleChoice } from "../entities/multiple-choice.entity";
import { QuizMetaData } from "../entities/quiz-meta-data.entity";
import { Quiz } from "../entities/quiz.entity";
import {
  toMultipleChoiceDomain,
  toQuizDomain,
} from "../mapper/quiz.mapper";
import { CreateQuizRepositoryPort } from "../port/create-quiz.repository.port";

export class CreateQuizRepositoryTypeormAdapter
  implements CreateQuizRepositoryPort
{
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(QuizMetaData)
    private readonly quizMetaDataRepository: Repository<QuizMetaData>,
    @InjectRepository(MultipleChoice)
    private readonly multipleChoiceRepository: Repository<MultipleChoice>,
  ) {}

  async findOneByUrl(
    url: string,
  ): Promise<QuizDomain | null> {
    const quizEntity = await this.quizRepository.findOne({
      where: { detailUrl: url },
    });

    if (!quizEntity) return null;

    const quizDomain = toQuizDomain(quizEntity);

    quizDomain.assignId(quizEntity.id);
    quizDomain.assignUpdatedAt(quizEntity.updatedAt);
    quizDomain.assignCreatedAt(quizEntity.createdAt);
    quizDomain.assignVersion(quizEntity.version);

    return quizDomain;
  }

  async save(quizDomain: QuizDomain): Promise<QuizDomain> {
    const metaEntity =
      await this.quizMetaDataRepository.save(
        quizDomain.quizMetaData,
      );

    const quizEntity = await this.quizRepository.save({
      title: quizDomain.title,
      content: quizDomain.content,
      explanation: quizDomain.explanation,
      detailUrl: quizDomain.detailUrl,
      field: quizDomain.field,
      answer: quizDomain.answer,
      quizMetaData: metaEntity,
    });

    // MultipleChoices 저장
    const multipleChoiceEntities =
      quizDomain.multipleChoices.map((choice) => ({
        ...choice,
        quiz: quizEntity,
      }));

    const savedMultiple =
      await this.multipleChoiceRepository.save(
        multipleChoiceEntities,
      );

    // 저장된 객관식 답안 => Domain 변환
    const savedMultipleToDomain = savedMultiple.map((m) => {
      const multipleDomain = toMultipleChoiceDomain(m);
      multipleDomain.assignId(m.id);
      return multipleDomain;
    });

    const savedQuiz = new QuizDomain(quizEntity);

    savedQuiz.assignMultipleChoices(savedMultipleToDomain);
    savedQuiz.assignId(quizEntity.id);
    savedQuiz.assignCreatedAt(quizEntity.createdAt);
    savedQuiz.assignUpdatedAt(quizEntity.updatedAt);
    savedQuiz.assignVersion(quizEntity.version);

    return savedQuiz;
  }
}
