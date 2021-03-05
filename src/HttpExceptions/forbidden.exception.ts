import {HttpException, HttpStatus} from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor() {
        super({
            status: "UNAUTHORIZED",
            error: "Access token is missing, invalid or expired",
        }, HttpStatus.FORBIDDEN);
    }
}