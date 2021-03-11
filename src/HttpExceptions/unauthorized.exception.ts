import {HttpException, HttpStatus} from "@nestjs/common";

export class UnauthorizedException extends HttpException {
    constructor() {
        super({
            status: "API_KEY_INVALID",
            error: "API key is missing or invalid",
        }, HttpStatus.UNAUTHORIZED);
    }
}