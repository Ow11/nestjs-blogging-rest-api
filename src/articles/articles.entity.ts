import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";

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
}