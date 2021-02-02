import {Controller, Get, Param, Post, Delete, Put, Body, HttpCode, Header, HttpStatus} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";
import {PostsService} from "./posts.service";

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) {

    }

    @Get()
    getAll() {
        return this.postsService.getAll();
    }

    @Get(':id')
    getBy(@Param('id') id: string): string {
        return this.postsService.getBy(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Header('Cache-Control', 'none')
    create(@Body() createPostDto: CreatePostDto) {
        return this.postsService.create(createPostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return 'Remove ' + id;
    }

    @Put(':id')
    update(@Body() updatePostDto: UpdatePostDto, @Param('id') id: string) {
        return 'update ' + id;
    }
}
