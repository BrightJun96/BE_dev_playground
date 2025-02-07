import {
  Prop,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CodeDocument = Code & Document;

@Schema()
export class Code {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const CodeSchema =
  SchemaFactory.createForClass(Code);
