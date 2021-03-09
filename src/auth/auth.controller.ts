import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {LocalAuthGuard} from "./local-auth.guard";

@Controller('login')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('create/default')
    async createDefault() {
        return this.authService.createDefaultUsers();
    }

    @UseGuards(LocalAuthGuard)
    @Post()
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
