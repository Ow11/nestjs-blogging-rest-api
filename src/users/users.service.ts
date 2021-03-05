import { Injectable } from '@nestjs/common';
import { User } from './user'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
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

    private async getHash(pass: string) {
        const saltOrRounds = 10;
        return await bcrypt.hash(pass, saltOrRounds);
    }

    async findOne(username: string): Promise<User | undefined> {
        const userIn = this.users.find((user) => user.username === username);
        const hash: string = await this.getHash(userIn.password);
        const userOut = {
            userId: userIn.userId,
            username: userIn.username,
            password: hash,
        }
        return userOut;
    }
}
