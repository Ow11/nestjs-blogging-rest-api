import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {ArticlesEntity} from "../articles/articles.entity";

@Entity()
export class CommentsEntity {
    @PrimaryColumn()
    commentId: string;

    @ManyToOne(() => ArticlesEntity, article => article.comments)
    articleId: string;

    @Column()
    author: string;

    @Column()
    content: string;

    @Column()
    postedAt: string;

    @Column()
    score: number;
}