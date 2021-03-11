import {Injectable} from "@nestjs/common";
import { CreateImageDto } from "./dto/create-image.dto";
import { ImageDto } from "./dto/image.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {ImagesEntity} from "./images.entity";
import {Repository} from "typeorm";
import {UnauthorizedException} from "../HttpExceptions/unauthorized.exception";
import { v4 as uuid } from "uuid";
import {defaultRoot} from "./images.constants";
import {unlink} from "fs/promises";

@Injectable()
export class ImagesService {
    constructor(@InjectRepository(ImagesEntity) private readonly imagesRepository: Repository<ImagesEntity>) {}

    async postImage(createImageDto: CreateImageDto): Promise<ImagesEntity> {
        const imageId = this.generateId();
        const name = createImageDto.name;
        const image: ImagesEntity = {
            imageId,
            name
        };
        await this.imagesRepository.save(image);
        return image;
    }

    async getBy(imageId: string): Promise<ImagesEntity> {
        return this.imagesRepository.findOne({imageId});
    }

    //TODO: check whether it already exist
    async remove(imageId: string): Promise<any> {
        const image = await this.imagesRepository.findOne(imageId);
        if(!image)
            throw new UnauthorizedException;
        const path = `${defaultRoot}/${image.name}`;
        try {
            await unlink(path);
        }
        catch (e) {
            throw e;
        }
        await this.imagesRepository.remove(image);
        return 'Image no longer exists';
    }

    private generateId(): string {
        return uuid();
        // return "img-" + Date.now().toString() + "-" + Math.floor(Math.random() * 9999);
    }
}