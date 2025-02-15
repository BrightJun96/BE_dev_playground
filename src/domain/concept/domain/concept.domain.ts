import { Field } from "../../../shared/enum/field.enum";
import { Tech } from "../../../shared/enum/tech.enum";
import { ConceptMetaDomain } from "./concept-meta.domain";

export interface ConceptDomainProps {
  id: number;
  title: string;
  content: string;
  detailUrl: string;
  tech: Tech;
  field: Field;
  conceptMeta: ConceptMetaDomain;
}

export class ConceptDomain {
  private readonly id: number;
  private readonly title: string;
  private readonly content: string;
  private readonly detailUrl: string;
  private readonly tech: Tech;
  private readonly field: Field;
  private readonly conceptMeta: ConceptMetaDomain;

  constructor({
    id,
    title,
    content,
    detailUrl,
    tech,
    field,
    conceptMeta,
  }: ConceptDomainProps) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.detailUrl = detailUrl;
    this.tech = tech;
    this.field = field;
    this.conceptMeta = conceptMeta;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getDetailUrl(): string {
    return this.detailUrl;
  }

  getTech(): Tech {
    return this.tech;
  }

  getField(): Field {
    return this.field;
  }

  getConceptMeta(): ConceptMetaDomain {
    return this.conceptMeta;
  }
}
