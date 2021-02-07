import { Injectable } from "@nestjs/common";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentDto} from "./dto/comment.dto";


@Injectable()
export class CommentsService {
    private comments = [];

    postComment(createCommentDto: CreateCommentDto): CommentDto {
        const commentId = this.generateId();
        const postedAt = Date.now().toString();
        const score = 0;
        const dto: CommentDto = {
            commentId,
            ...createCommentDto,
            postedAt,
            score,
        };
        this.comments.push(dto);
        return dto;
    }

    private generateId(): string {
        return "cmt-" + Date.now().toString() + "-" + Math.floor(Math.random() * 9999);
    }
}