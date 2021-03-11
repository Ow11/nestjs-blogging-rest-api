import {Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {CommentsEntity} from "../comments/comments.entity";

@Entity()
export class ArticlesEntity {
    @PrimaryColumn()
    articleId: string;

    @Column()
    title: string;

    @Column()
    perex: string;

    @Column()
    imageId: string;

    @Column()
    createdAt: string;

    @Column()
    lastUpdatedAt: string;

    @Column("text")
    content: string;

    @OneToMany(() => CommentsEntity, comments => comments.articleId)
    comments: CommentsEntity[];
}