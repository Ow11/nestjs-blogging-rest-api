import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class ImagesEntity {
    @PrimaryColumn()
    imageId: string;

    @Column()
    name: string;
}