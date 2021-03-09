import {
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Patch,
    Body,
    HttpCode,
    Header,
    HttpStatus,
    UseGuards
} from '@nestjs/common';
import {CreateArticleDto} from "./dto/create-article.dto";
import {UpdateArticleDto} from "./dto/update-article.dto";
import {ArticlesService} from "./articles.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('articles')
export class ArticlesController {

    constructor(private readonly articlesService: ArticlesService) {}

    //TODO обрабатывать ошибки

    @Get()
    async getAll() {
        return this.articlesService.getAll();
    }

    @Get(':id')
    async getBy(@Param('id') id: string) {
        return this.articlesService.getBy(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @Header('Cache-Control', 'none')
    async create(@Body() createArticleDto: CreateArticleDto) {
        return this.articlesService.create(createArticleDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.articlesService.remove(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Body() updateArticleDto: UpdateArticleDto, @Param('id') id: string) {
        return 'update ' + id;
    }
}
