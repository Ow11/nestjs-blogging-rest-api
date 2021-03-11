import {Injectable} from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import {ArticleDto} from "./dto/article.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {ArticlesEntity} from "./articles.entity";
import {Repository} from "typeorm";
import {UpdateArticleDto} from "./dto/update-article.dto";
import {UnauthorizedException} from "../HttpExceptions/unauthorized.exception";
import { v4 as uuid } from "uuid";

@Injectable()
export class ArticlesService {
    constructor(@InjectRepository(ArticlesEntity) private readonly articleRepository: Repository<ArticlesEntity>) {
    }

    getAll(): Promise<ArticlesEntity[]> {
        return this.articleRepository.find();
    }

    //TODO: get the array of comments
    getBy(articleId: string): Promise<ArticlesEntity> {
        return this.articleRepository.findOne({
            where: {
                articleId
            },
            relations: ['comments']
        });
    }

    async create(createArticleDto: CreateArticleDto): Promise<ArticlesEntity> {
        const articleId = this.generateId();
        // const title = createArticleDto.title;
        // const perex = createArticleDto.perex;
        // const imageId = createArticleDto.imageId;
        const createdAt = new Date().toISOString();
        const lastUpdatedAt = createdAt;
        // const content = createArticleDto.content;
        const comments = [];
        const article = {
            articleId,
            createdAt,
            lastUpdatedAt,
            comments,
            ...createArticleDto
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
        const lastUpdatedAt = new Date().toISOString();
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

    async remove(articleId: string): Promise<any> {
        const article = await this.articleRepository.findOne({articleId});
        try {
            await this.articleRepository.remove(article);
        }
        catch(e) {
            throw new UnauthorizedException();
        }
        return 'Article no longer exists';
    }

    private generateId(): string {
        return uuid();
        // return "art-" + Date.now().toString() + "-" + Math.floor(Math.random() * 9999);
    }
}