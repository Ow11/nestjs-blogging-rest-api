import { Injectable } from "@nestjs/common";
import {CreateArticleDto} from "./dto/create-article.dto";

@Injectable()
export class ArticlesService {
    private articles = [];

    getAll() {
        return this.articles;
    }

    getBy(id: string) {
        return this.articles.find(p => p.id === id);
    }

    create(articleDto: CreateArticleDto) {
        const id = this.generateId();
        this.articles.push({
            ...articleDto,
            id,
        })
    }

    private generateId(): string {
        return Date.now().toString() + Math.floor(Math.random() * 9999);
    }
}