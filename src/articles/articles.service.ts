import { Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import {ArticleDto} from "./dto/article.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {ArticlesEntity} from "./articles.entity";
import {Repository} from "typeorm";
import {UpdateArticleDto} from "./dto/update-article.dto";

@Injectable()
export class ArticlesService {
    constructor(@InjectRepository(ArticlesEntity) private readonly articleRepository: Repository<ArticlesEntity>) {
    }

    async getAll(): Promise<ArticlesEntity[]> {
        return this.articleRepository.find();
    }

    //TODO get the array of comments
    async getBy(articleId: string): Promise<ArticlesEntity> {
        return this.articleRepository.findOne({articleId});
    }

    async create(createArticleDto: CreateArticleDto): Promise<ArticlesEntity> {
        const articleId = this.generateId();
        const title = createArticleDto.title;
        const perex = createArticleDto.perex;
        const imageId = createArticleDto.imageId;
        const createdAt = Date.now().toString();
        const lastUpdatedAt = createdAt;
        const content = createArticleDto.content;
        const article = {
            articleId,
            title,
            perex,
            imageId,
            createdAt,
            lastUpdatedAt,
            content,
        };
        await this.articleRepository.save(article);
        return article;
    }

    async update(articleId: string, updateArticleDto: UpdateArticleDto): Promise<ArticlesEntity> {
        const originalArticle = await this.articleRepository.findOne({articleId})

        const title = updateArticleDto.title;
        const perex = updateArticleDto.perex;
        const imageId = updateArticleDto.imageId;
        const createdAt = originalArticle.createdAt;
        const lastUpdatedAt = Date.now().toString();
        const content = updateArticleDto.content;
        const article = {
            articleId,
            title,
            perex,
            imageId,
            createdAt,
            lastUpdatedAt,
            content,
        };
        await this.articleRepository.remove(originalArticle)
        await this.articleRepository.save(article);
        return this.getBy(articleId);
    }

    async remove(articleId: string): Promise<string> {
        const article = await this.articleRepository.findOne({articleId});
        try {
            await this.articleRepository.remove(article);
        }
        catch(e) {
            return 'Error';
        }
        return 'Article no longer exists';
    }

    private generateId(): string {
        return "art-" + Date.now().toString() + "-" + Math.floor(Math.random() * 9999);
    }
}