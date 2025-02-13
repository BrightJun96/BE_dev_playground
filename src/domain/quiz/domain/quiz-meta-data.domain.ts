export class QuizMetaDataDomain {
  id: number;
  seoMetaTitle: string;
  seoMetaDescription: string;
  metaImageUrl?: string;

  constructor({
    id,
    seoMetaTitle,
    seoMetaDescription,
    metaImageUrl,
  }: {
    id: number;
    seoMetaTitle: string;
    seoMetaDescription: string;
    metaImageUrl?: string;
  }) {
    this.id = id;
    this.seoMetaTitle = seoMetaTitle;
    this.seoMetaDescription = seoMetaDescription;
    this.metaImageUrl = metaImageUrl;
  }
}
