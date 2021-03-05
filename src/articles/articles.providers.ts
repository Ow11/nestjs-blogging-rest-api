import {Connection} from "typeorm";
import {ArticlesEntity} from "./articles.entity";
import {provide, inject} from "./article.config";


export const articlesProviders = [
    {
        provide,
        useFactory: (connection: Connection) => connection.getRepository(ArticlesEntity),
        inject,
    }
];