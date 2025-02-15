export interface ConceptMetaDomainProps {
  id: number;
  metaTitle: string;
  metaDescription: string;
  metaImageUrl?: string;
}

export class ConceptMetaDomain {
  private readonly id: number;
  private readonly metaTitle: string;
  private readonly metaDescription: string;
  private readonly metaImageUrl?: string;

  constructor({
    id,
    metaTitle,
    metaDescription,
    metaImageUrl,
  }: ConceptMetaDomainProps) {
    this.id = id;
    this.metaTitle = metaTitle;
    this.metaDescription = metaDescription;
    this.metaImageUrl = metaImageUrl;
  }

  getId(): number {
    return this.id;
  }

  getMetaTitle(): string {
    return this.metaTitle;
  }

  getMetaDescription(): string {
    return this.metaDescription;
  }

  getMetaImageUrl(): string | undefined {
    return this.metaImageUrl;
  }
}
