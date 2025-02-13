import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QuizDomain } from "../../../../domain/quiz.domain";
import { CreateQuizRepositoryPort } from "../../../../port/output/create-quiz.repository.port";
import { MultipleChoice } from "../entities/multiple-choice.entity";
import { QuizMetaData } from "../entities/quiz-meta-data.entity";
import { Quiz } from "../entities/quiz.entity";
import { toMultipleChoiceDomain } from "../mapper/quiz.mapper";

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

  async findOneByUrl(url: string): Promise<void> {
    const quizEntity = await this.quizRepository.findOne({
      where: { detailUrl: url },
    });

    if (quizEntity) {
      throw new BadRequestException(
        "detailUrl은 중복되면 안됩니다.",
      );
    }
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
    savedQuiz.assignMetadata(metaEntity);

    return savedQuiz;
  }
}
