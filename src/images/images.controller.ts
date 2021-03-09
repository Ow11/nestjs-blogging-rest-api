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
    HttpException, UseGuards
} from '@nestjs/common';
import {ImagesService} from "./images.service";
import {CreateImageDto} from "./dto/create-image.dto";
import {ImageDto} from "./dto/image.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";


@Controller('images')
export class ImagesController {

    constructor(private readonly imagesService: ImagesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    postImage(@Body() createImageDto: CreateImageDto[]): ImageDto[] {
        let imageDto: ImageDto[] = [];
        createImageDto.forEach((name: CreateImageDto) => {
            imageDto.push(this.imagesService.postImage(name));
        });
        return imageDto;
    }

    @Get(':id')
    getBy(@Param('id') id: string): any {
        const result = this.imagesService.getBy(id);
        if (result)
            return result;
        throw new HttpException('API key missing or invalid', HttpStatus.UNAUTHORIZED);
    }

    //TODO: add http status 204, 401
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string): any {
        const result = this.imagesService.remove(id);
        if (result)
            return result;
        throw new HttpException('API key missing or invalid', HttpStatus.UNAUTHORIZED);
    }
}