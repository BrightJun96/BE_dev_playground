import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Relations } from "../../../shared/const/relation.const";
import { QuizMetaDataDomain } from "../domain/quiz-meta-data.domain";
import { QuizDomain } from "../domain/quiz.domain";
import { CreateMultipleChoiceRequestDto } from "../dto/request/create-multiple-choice.request.dto";
import { CreateQuizMetaDataDtoRequest } from "../dto/request/create-quiz-meta-data.dto.request";
import { CreateQuizRequestDto } from "../dto/request/create-quiz.request.dto";
import { MultipleChoice } from "../entities/multiple-choice.entity";
import { QuizMetaData } from "../entities/quiz-meta-data.entity";
import { Quiz } from "../entities/quiz.entity";
import {
  toMultipleChoiceDomain,
  toQuizDomain,
  toQuizMetaDataDomain,
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

    return quizEntity ? toQuizDomain(quizEntity) : null;
  }

  async findOneById(id: number): Promise<QuizDomain> {
    const quizEntity = await this.quizRepository.findOne({
      where: {
        id,
      },
      relations: [
        Relations.QUIZ.META,
        Relations.QUIZ.MULTIPLE,
      ],
    });

    const quizDomain = toQuizDomain(quizEntity);
    quizDomain.assignMultipleChoices(
      quizEntity.multipleChoices,
    );

    quizDomain.assignMultipleChoices(
      quizEntity.multipleChoices,
    );
    return quizEntity ? toQuizDomain(quizEntity) : null;
  }

  async createQuizMetaData(
    metaData: CreateQuizMetaDataDtoRequest,
  ): Promise<QuizMetaDataDomain> {
    const metaDataEntity =
      await this.quizMetaDataRepository.save(metaData);

    return toQuizMetaDataDomain(metaDataEntity);
  }

  async createQuiz(
    createQuizDto: CreateQuizRequestDto,
    createdQuizMetaId: number,
  ): Promise<QuizDomain> {
    const quizEntity = await this.quizRepository.save({
      title: createQuizDto.title,
      content: createQuizDto.content,
      explanation: createQuizDto.explanation,
      detailUrl: createQuizDto.detailUrl,
      field: createQuizDto.field,
      answer: createQuizDto.answer,
      quizMetaData: { id: createdQuizMetaId },
    });

    return toQuizDomain(quizEntity);
  }

  async createMultipleChoices(
    multipleChoicesDto: CreateMultipleChoiceRequestDto[],
    createdQuizId: number,
  ): Promise<void> {
    // 각 DTO에 quiz 관계 추가
    const choicesWithQuiz = multipleChoicesDto.map(
      (choice) => ({
        ...choice,
        quiz: { id: createdQuizId }, // 퀴즈 ID 설정
      }),
    );

    const entities =
      await this.multipleChoiceRepository.save(
        choicesWithQuiz,
      );

    entities.map(toMultipleChoiceDomain);
  }
}
