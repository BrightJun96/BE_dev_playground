import { BadRequestException } from "@nestjs/common";
import { Field } from "../../../shared/enum/field.enum";
import { CreateQuizRequestDto } from "../dto/request/create-quiz.request.dto";
import { MultipleChoiceDomain } from "./multiple-choice.domain";
import { QuizMetaDataDomain } from "./quiz-meta-data.domain";

export class QuizDomain {
  id: number;
  title: string;
  content: string;
  detailUrl: string;
  field: Field;
  explanation: string;
  answer: number;
  quizMetaData: QuizMetaDataDomain;
  multipleChoices: MultipleChoiceDomain[];
  createdAt: Date;
  updatedAt: Date;
  version: number;

  constructor({
    title,
    content,
    detailUrl,
    field,
    explanation,
    answer,
    // quizMetaData,
  }: {
    title: string;
    content: string;
    detailUrl: string;
    field: Field;
    explanation: string;
    answer: number;
    // quizMetaData: QuizMetaDataDomain;
  }) {
    this.title = title;
    this.content = content;
    this.detailUrl = detailUrl;
    this.field = field;
    this.explanation = explanation;
    this.answer = answer;
    // this.quizMetaData = quizMetaData;
  }

  /**  퀴즈 도메인 객체 생성 (팩토리 메서드) */
  static create(
    createQuizDto: CreateQuizRequestDto,
    quizMetaData: QuizMetaDataDomain,
    multipleChoices: MultipleChoiceDomain[],
  ): QuizDomain {
    if (!createQuizDto.title || !createQuizDto.detailUrl) {
      throw new BadRequestException(
        "퀴즈 제목과 URL은 필수입니다.",
      );
    }

    const quiz = new QuizDomain({
      title: createQuizDto.title,
      content: createQuizDto.content,
      detailUrl: createQuizDto.detailUrl,
      field: createQuizDto.field,
      explanation: createQuizDto.explanation,
      answer: createQuizDto.answer,
    });

    quiz.assignMetadata(quizMetaData);
    quiz.assignMultipleChoices(multipleChoices);
    return quiz;
  }

  assignMultipleChoices(
    multipleChoices: MultipleChoiceDomain[],
  ) {
    this.multipleChoices = multipleChoices;
  }

  assignMetadata(quizMetaData: QuizMetaDataDomain) {
    this.quizMetaData = quizMetaData;
  }

  assignId(id: number) {
    this.id = id;
  }

  assignCreatedAt(date: Date) {
    this.createdAt = date;
  }

  assignUpdatedAt(date: Date) {
    this.updatedAt = date;
  }
  assignVersion(version: number) {
    this.version = version;
  }
}
