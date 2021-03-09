import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ArticlesModule} from "./articles/articles.module";
import {ImagesModule} from "./images/images.module";
import {CommentsModule} from "./comments/comments.module";
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ArticlesModule,
    ImagesModule,
    CommentsModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
