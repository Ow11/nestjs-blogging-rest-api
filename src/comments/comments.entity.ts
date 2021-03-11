import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class CommentsEntity {
    @PrimaryColumn()
    commentId: string;

    @Column()
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