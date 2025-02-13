export class QuizMetaDataDomain {
  id: number;
  seoMetaTitle: string;
  seoMetaDescription: string;
  metaImageUrl?: string;

  constructor({
    seoMetaTitle,
    seoMetaDescription,
    metaImageUrl,
  }: {
    seoMetaTitle: string;
    seoMetaDescription: string;
    metaImageUrl?: string;
  }) {
    this.seoMetaTitle = seoMetaTitle;
    this.seoMetaDescription = seoMetaDescription;
    this.metaImageUrl = metaImageUrl;
  }

  assignId(id: number) {
    this.id = id;
  }
}
