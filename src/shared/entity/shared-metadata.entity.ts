import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({
  comment: "메타 데이터",
})
export class SharedMetadataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: "프론트 title 태그에 사용",
  })
  metaTitle: string;

  @Column({
    comment: "프론트 description 태그에 사용",
  })
  metaDescription: string;

  @Column({
    comment: "프론트 imageUrl에 사용",
    nullable: true,
  })
  metaImageUrl: string;
}
