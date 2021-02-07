import {
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Patch,
    Body,
    HttpCode,
    Header,    HttpStatus,
    HttpException
} from '@nestjs/common';
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentDto} from "./dto/comment.dto";


@Controller('comments')
export class CommentsController {

    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    postImage(@Body() createCommentDto: CreateCommentDto): CommentDto {
        return this.commentsService.postComment(createCommentDto);
    }

    // @Post(':id')

    // @Get(':id')
    // getBy(@Param('id') id: string): any {
    //     const result = this.imagesService.getBy(id);
    //     if (result)
    //         return result;
    //     throw new HttpException('API key missing or invalid', HttpStatus.UNAUTHORIZED);
    // }
}