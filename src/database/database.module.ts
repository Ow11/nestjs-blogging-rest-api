import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticlesEntity} from "../articles/articles.entity";
import {UsersEntity} from "../users/users.entity";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'toor',
        database: 'aldb',
        entities: [ArticlesEntity, UsersEntity],
        synchronize: true,
    })]
})
export class DatabaseModule {}
