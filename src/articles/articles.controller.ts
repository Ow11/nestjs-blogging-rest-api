import {Controller, Get, Param, Post, Delete, Patch, Body, HttpCode, Header, HttpStatus} from '@nestjs/common';
import {CreateArticleDto} from "./dto/create-article.dto";
import {UpdateArticleDto} from "./dto/update-article.dto";
import {ArticlesService} from "./articles.service";

@Controller('articles')
export class ArticlesController {

    constructor(private readonly articlesService: ArticlesService) {}

    @Get()
    getAll() {
        return this.articlesService.getAll();
    }

    @Get(':id')
    getBy(@Param('id') id: string): string {
        return this.articlesService.getBy(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createArticleDto: CreateArticleDto) {
        return this.articlesService.create(createArticleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return 'Remove ' + id;
    }

    @Patch(':id')
    update(@Body() updateArticleDto: UpdateArticleDto, @Param('id') id: string) {
        return 'update ' + id;
    }
}
