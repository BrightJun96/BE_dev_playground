import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type RoadmapDocument = HydratedDocument<Roadmap>;

@Schema({ timestamps: true })
export class Roadmap {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({
    required: false,
  })
  link?: string;

  @Prop({
    type: Types.ObjectId,
    ref: "Roadmap",
    default: null,
  })
  parent?: Types.ObjectId; // 부모 Roadmap (없으면 Root)

  @Prop({
    type: [Types.ObjectId],
    ref: "Roadmap",
    default: [],
  })
  children?: Types.ObjectId[]; // 자식 Roadmap 리스트
}

export const RoadmapSchema =
  SchemaFactory.createForClass(Roadmap);
