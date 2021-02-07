import { Injectable } from "@nestjs/common";
import { CreateImageDto } from "./dto/create-image.dto";
import { ImageDto } from "./dto/image.dto";

@Injectable()
export class ImagesService {
    private images = [];

    postImage(createImageDto: CreateImageDto): ImageDto {
        const imageId = this.generateId();
        const name = createImageDto.name;
        const dto: ImageDto = {
            imageId,
            name
        };
        this.images.push(dto);
        return dto;
    }

    getBy(id: string): any {
        const imageDto: ImageDto = this.images.find(p => p.imageId === id);
        return imageDto;
    }

    //TODO: check whether it even exist
    remove(id: string): string {
        this.images = this.images.filter((image) => {
            return image.imageId != id;
        });
        return 'Image no longer exists'
    }

    private generateId(): string {
        return "img-" + Date.now().toString() + "-" + Math.floor(Math.random() * 9999);
    }
}