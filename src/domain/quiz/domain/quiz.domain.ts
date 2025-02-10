import { Field } from "../../../shared/enum/field.enum";

export class QuizDomain {
  id: number;
  title: string;
  content: string;
  detailUrl: string;
  field: Field;
  explanation: string;
  answer: number;
  quizMetaData: object;
  multipleChoices: object[];
  createdAt: Date;
  updatedAt: Date;
  version: number;

  constructor({
    id,
    title,
    content,
    detailUrl,
    field,
    explanation,
    answer,
    quizMetaData,
    multipleChoices,
    createdAt,
    updatedAt,
    version,
  }: {
    id: number;
    title: string;
    content: string;
    detailUrl: string;
    field: Field;
    explanation: string;
    answer: number;
    quizMetaData: object;
    multipleChoices: object[];
    createdAt: Date;
    updatedAt: Date;
    version: number;
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.detailUrl = detailUrl;
    this.field = field;
    this.explanation = explanation;
    this.answer = answer;
    this.quizMetaData = quizMetaData;
    this.multipleChoices = multipleChoices;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.version = version;
  }
}
