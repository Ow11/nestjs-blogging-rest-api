import { Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";

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
        const createdAt = Date.now().toString();
        const id = this.generateId();
        this.articles.push({
            ...articleDto,
            id,
            createdAt,
            'lastUpdatedAt': createdAt,
        });
    }

    update(id: string, articleDto: CreateArticleDto) {
        const createdAt = this.getBy(id).createdAt;
        const lastUpdatedAt = Date.now().toString();
        this.articles = this.articles.filter((article) => {
            return article.id != id;
        });
        this.articles.push({
            ...articleDto,
            id,
            createdAt,
            lastUpdatedAt,
        });
    }

    private generateId(): string {
        return "art-" + Date.now().toString() + "-" + Math.floor(Math.random() * 9999);
    }
}