import { Entity } from "typeorm";

@Entity()
export class Interview {
  title: string;
  content: string;
}
