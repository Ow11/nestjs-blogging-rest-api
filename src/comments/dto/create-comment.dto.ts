export class CreateCommentDto {
    readonly articleId: string;
    readonly author: string;
    readonly content: string;
}