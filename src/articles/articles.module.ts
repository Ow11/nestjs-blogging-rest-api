import {Module} from "@nestjs/common";
import {ArticlesController} from "./articles.controller";
import {ArticlesService} from "./articles.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ArticlesEntity} from "./articles.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ArticlesEntity])],
    providers: [ArticlesService],
    controllers: [ArticlesController]
})
export class ArticlesModule {}
