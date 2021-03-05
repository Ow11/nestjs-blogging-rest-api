import { Injectable } from "@nestjs/common";
import {LoginDto} from "./dto/login.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {ArticlesEntity} from "../articles/articles.entity";
import {Repository} from "typeorm";


@Injectable()
export class LoginService {
    // constructor(@InjectRepository(ArticlesEntity) private readonly articleRepository: Repository<ArticlesEntity>) {
    // }

    logIn(loginDto: LoginDto) {
        return {
            "access_token": "token",
            "expires_in": 3600,
            "token_type": "bearer"
        }
    }
}