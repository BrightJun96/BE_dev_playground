export class MultipleChoiceDomain {
  id: number;
  content: string;

  constructor({ content }: { content: string }) {
    this.content = content;
  }

  assignId(id: number) {
    this.id = id;
  }
}
