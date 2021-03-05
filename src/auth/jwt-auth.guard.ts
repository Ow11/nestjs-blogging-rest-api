import {HttpException, HttpStatus, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {ForbiddenException} from "../HttpExceptions/forbidden.exception";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new ForbiddenException();
        }
        return user;
    }
}