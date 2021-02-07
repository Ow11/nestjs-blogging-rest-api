import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ArticlesModule} from "./articles/articles.module";
import {ImagesModule} from "./images/images.module";

@Module({
  imports: [ArticlesModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
