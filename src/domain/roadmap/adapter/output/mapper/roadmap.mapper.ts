import { RoadmapDomain } from "../../../domain/roadmap.domain";
import { RoadmapDocument } from "../mongoose/schema/roadmap.scheme";

export function roadmapDocToDomain(
  roadmapDoc: RoadmapDocument,
): RoadmapDomain {
  const roadmapDomain = new RoadmapDomain({
    id: roadmapDoc._id.toString(),
    title: roadmapDoc.title,
    children: roadmapDoc.children.map((objectId) =>
      objectId.toString(),
    ),
    parent: roadmapDoc.parent
      ? roadmapDoc.parent.toString()
      : null,
  });

  if (roadmapDoc.link) {
    roadmapDomain.assignLink(roadmapDoc.link);
  }

  return roadmapDomain;
}
