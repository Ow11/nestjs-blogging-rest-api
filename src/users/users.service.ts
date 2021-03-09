import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {InjectRepository} from "@nestjs/typeorm";
import {UsersEntity} from "./users.entity";
import {Repository} from "typeorm";
import {UsersDto} from "./dto/users.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>) {
    }

    private readonly users = [
        {
            userId: 1,
            username: "Admin",
            password: "123",
        },
        {
            userId: 2,
            username: 'user',
            password: 'pass',
        },
    ];

    private async getHash(pass: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(pass, saltOrRounds);
    }

    private async pushUser(usersDto: UsersDto): Promise<UsersDto | null> {
        let user = usersDto;
        const hash: string = await this.getHash(usersDto.password);
        user.password = hash;
        await this.usersRepository.save(user);
        return user;
    }

    async pushDefaultUsers(): Promise<UsersDto[] | undefined> {
        let users: UsersDto[] = [];
        for (let i = 0; i < this.users.length; i++) {
            const user = this.users[i];
            const result = await this.pushUser(user);
            if (result)
                users.push(result);
        }
        return users;
    }

    async findOne(username: string): Promise<UsersDto | undefined> {
        return this.usersRepository.findOne({username});
    }
}
