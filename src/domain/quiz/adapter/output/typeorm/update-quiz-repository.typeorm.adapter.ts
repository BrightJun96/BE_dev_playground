import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Relations } from "../../../../../shared/const/relation.const";
import { QuizDomain } from "../../../domain/quiz.domain";
import { UpdateMultipleChoiceRequestDto } from "../../../dto/request/update-multiple-choice.request.dto";
import { UpdateQuizMetaDataRequestDto } from "../../../dto/request/update-quiz-meta-data.request.dto";
import { UpdateQuizRequestDto } from "../../../dto/request/update-quiz.request.dto";
import { UpdateQuizRepositoryPort } from "../../../port/output/update-quiz.repository.port";
import { MultipleChoice } from "./entities/multiple-choice.entity";
import { QuizMetaData } from "./entities/quiz-meta-data.entity";
import { Quiz } from "./entities/quiz.entity";
import {
  toMultipleChoiceDomain,
  toQuizDomain,
} from "./mapper/quiz.mapper";

export class UpdateQuizRepositoryTypeormAdapter
  implements UpdateQuizRepositoryPort
{
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(QuizMetaData)
    private readonly quizMetaDataRepository: Repository<QuizMetaData>,
    @InjectRepository(MultipleChoice)
    private readonly multipleChoiceRepository: Repository<MultipleChoice>,
  ) {}

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

    if (!quizEntity) {
      throw new BadRequestException(
        "해당 퀴즈는 존재하지 않습니다.",
      );
    }

    const quizDomain = toQuizDomain(quizEntity);
    const quizMultipleDomain =
      quizEntity.multipleChoices.map((m) => {
        const multipleDomain = toMultipleChoiceDomain(m);
        multipleDomain.assignId(m.id);
        return multipleDomain;
      });
    quizDomain.assignId(quizEntity.id);
    quizDomain.assignUpdatedAt(quizEntity.updatedAt);
    quizDomain.assignCreatedAt(quizEntity.createdAt);
    quizDomain.assignVersion(quizEntity.version);
    quizDomain.assignMultipleChoices(quizMultipleDomain);

    return quizDomain;
  }

  async updateQuiz(
    quizId: number,
    updateQuizDto: UpdateQuizRequestDto,
  ): Promise<void> {
    await this.quizRepository.update(quizId, {
      title: updateQuizDto.title,
      content: updateQuizDto.content,
      explanation: updateQuizDto.explanation,
      detailUrl: updateQuizDto.detailUrl,
      field: updateQuizDto.field,
      answer: updateQuizDto.answer,
    });
  }

  async updateMetaData(
    metaId: number,
    updateMetaDto: UpdateQuizMetaDataRequestDto,
  ): Promise<void> {
    await this.quizMetaDataRepository.update(
      metaId,
      updateMetaDto,
    );
  }

  async updateMultipleChoices(
    choicesDto: UpdateMultipleChoiceRequestDto[],
  ): Promise<void> {
    const ids = choicesDto.map((choice) => choice.id); // 업데이트할 ID 추출

    const contentCase = choicesDto
      .map((choice) =>
        choice.content
          ? `WHEN id = ${choice.id} THEN '${choice.content}'`
          : "",
      )
      .join(" ");

    await this.multipleChoiceRepository
      .createQueryBuilder()
      .update(MultipleChoice)
      .set({
        content: () =>
          `CASE ${contentCase} ELSE content END`,
      })
      .where("id IN (:...ids)", { ids })
      .execute();
  }
}
