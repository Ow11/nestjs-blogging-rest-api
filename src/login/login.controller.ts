import {
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Patch,
    Body,
    HttpCode,
    Header, HttpStatus,
    HttpException, UseGuards, Request
} from '@nestjs/common';
import {LoginService} from "./login.service";
import {LoginDto} from "./dto/login.dto";
import {AuthGuard} from "@nestjs/passport";


@Controller('login2')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @UseGuards(AuthGuard('local'))
    @Post()
    async login(@Request() req) {
        return req.user;
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