import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class UsersEntity {
    @PrimaryColumn()
    userId: number;

    @Column()
    username: string;

    @Column()
    password: string;
}