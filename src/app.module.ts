import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ArticlesModule} from "./articles/articles.module";
import {ImagesModule} from "./images/images.module";
import {CommentsModule} from "./comments/comments.module";
import {LoginModule} from "./login/login.module";

@Module({
  imports: [ArticlesModule, ImagesModule, CommentsModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
