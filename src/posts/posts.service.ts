import { Injectable } from "@nestjs/common";
import {CreatePostDto} from "./dto/create-post.dto";

@Injectable()
export class PostsService {
    private posts = [];

    getAll() {
        return this.posts;
    }

    getBy(id: string) {
        return this.posts.find(p => p.id === id);
    }

    create(postDto: CreatePostDto) {
        const id = this.generateId();
        this.posts.push({
            ...postDto,
            id,
        })
    }

    private generateId(): string {
        return Date.now().toString() + Math.floor(Math.random() * 9999);
    }
}