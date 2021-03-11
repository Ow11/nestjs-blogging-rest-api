import { Injectable } from "@nestjs/common";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {CommentDto} from "./dto/comment.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {CommentsEntity} from "./comments.entity";
import {Repository} from "typeorm";
import { v4 as uuid } from "uuid";

@Injectable()
export class CommentsService {
    constructor(@InjectRepository(CommentsEntity) private readonly commentsRepository: Repository<CommentsEntity>) {
    }

    async postComment(createCommentDto: CreateCommentDto): Promise<CommentDto> {
        const commentId = this.generateId();
        const postedAt = new Date().toISOString();
        const score = 0;
        const comment: CommentsEntity = {
            commentId,
            ...createCommentDto,
            postedAt,
            score,
        };
        await this.commentsRepository.save(comment);
        return comment;
    }

    private generateId(): string {
        return uuid();
        // return "cmt-" + Date.now().toString() + "-" + Math.floor(Math.random() * 9999);
    }
}