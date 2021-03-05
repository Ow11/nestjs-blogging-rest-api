import {Column, Entity, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class ArticlesEntity {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    password: string;
}