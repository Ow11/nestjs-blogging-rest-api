import {
    Controller,
    Get,
    Param,
    Post,
    Delete,
    Body,
    UseGuards,
    UseInterceptors, UploadedFiles, UploadedFile, Res, HttpCode
} from '@nestjs/common';
import {ImagesService} from "./images.service";
import {CreateImageDto} from "./dto/create-image.dto";
import {ImageDto} from "./dto/image.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {AnyFilesInterceptor, FilesInterceptor, FileInterceptor} from "@nestjs/platform-express";
import {Express} from "express";
import {diskStorage} from "multer";
import {imageFileFilter, editFileName} from "./images.uploading.utils";
import {UnauthorizedException} from "../HttpExceptions/unauthorized.exception";
import {defaultRoot} from "./images.constants";
import {ImagesEntity} from "./images.entity";


@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('image', 5, {
        storage: diskStorage({
            destination: defaultRoot,
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async uploadImage(@UploadedFiles() files) {
        if(!files)
            throw new UnauthorizedException();
        const response = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const createImageDto: CreateImageDto = {
                name: file.filename,
            }
            const fileResponse = await this.imagesService.postImage(createImageDto);
            response.push(fileResponse);
        }
        return response;
    }

    @Get(':id')
    async getBy(@Param('id') id: string, @Res() res) {
        const image: ImagesEntity = await this.imagesService.getBy(id);
        if (!image)
            throw new UnauthorizedException;
        const imgpath = image.name;
        return res.sendFile(imgpath, { root: defaultRoot });
    }

    //TODO: add http code 204
    @Delete(':id')
    // @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.imagesService.remove(id);
    }
}