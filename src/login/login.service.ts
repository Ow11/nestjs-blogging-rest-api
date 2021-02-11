import { Injectable } from "@nestjs/common";
import {LoginDto} from "./dto/login.dto";


@Injectable()
export class LoginService {

    logIn(loginDto: LoginDto): object {
        return {
            "access_token": "token",
            "expires_in": 3600,
            "token_type": "bearer"
        }
    }
}