import {Module} from "@nestjs/common";
import {ImagesService} from "./images.service";
import {ImagesController} from "./images.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ImagesEntity} from "./images.entity";
import {MulterModule} from "@nestjs/platform-express";
import {defaultRoot} from "./images.constants";

@Module({
    imports: [
        TypeOrmModule.forFeature([ImagesEntity]),
        MulterModule.register({
            dest: defaultRoot,
        })
    ],
    providers: [ImagesService],
    controllers: [ImagesController]
})
export class ImagesModule {}