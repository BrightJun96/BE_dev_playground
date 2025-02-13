export class MultipleChoiceDomain {
  id: number;
  content: string;

  constructor({
    id,
    content,
  }: {
    id: number;
    content: string;
  }) {
    this.id = id;
    this.content = content;
  }
}
