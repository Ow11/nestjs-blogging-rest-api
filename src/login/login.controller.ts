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
import {LoginService} from "./login.service";
import {LoginDto} from "./dto/login.dto";


@Controller('comments')
export class LoginController {

    constructor(private readonly loginService: LoginService) {}

    @Post()
    postImage(@Body() loginDto: LoginDto): object {
        return this.loginService.logIn(loginDto);
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