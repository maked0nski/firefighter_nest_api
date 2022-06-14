import {Injectable} from '@nestjs/common';

import {CreateUserLoginDTO} from "./dto/create-user-login.DTO";

@Injectable()
export class UserLoginService {
    private authUsers = [];

    getAll() {
        return this.authUsers;
    }

    getById(id: string) {
        return this.authUsers.find(u => u.id === id);
    }

    createAuthUser(createAuthUserDTO: CreateUserLoginDTO) {
        this.authUsers.push({
            ...createAuthUserDTO,
            id: Date.now().toString()
        })
        return createAuthUserDTO;
    }
}
