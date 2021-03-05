import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticlesEntity} from "../articles/articles.entity";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'toor',
        database: 'aldb',
        entities: [ArticlesEntity],
        synchronize: true,
    })]
})
export class DatabaseModule {}
