import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticlesEntity} from "../articles/articles.entity";
import {UsersEntity} from "../users/users.entity";
import {CommentsEntity} from "../comments/comments.entity";
import {ImagesEntity} from "../images/images.entity";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'toor',
        database: 'aldb',
        entities: [ArticlesEntity, ImagesEntity, UsersEntity, CommentsEntity],
        synchronize: true,
    })]
})
export class DatabaseModule {}
