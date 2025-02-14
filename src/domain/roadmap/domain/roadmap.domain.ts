interface Props {
  id: string;
  title: string;
  parent: string | null;
  children: string[] | RoadmapDomain[];
}

export class RoadmapDomain {
  id: string;
  title: string;
  link: string;
  parent: string;
  children: string[] | RoadmapDomain[];

  constructor({ id, title, children, parent }: Props) {
    this.id = id;
    this.title = title;
    this.parent = parent;
    this.children = children;
  }

  assignLink(link: string) {
    this.link = link;
  }
}
