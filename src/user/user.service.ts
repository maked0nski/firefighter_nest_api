import {Injectable} from '@nestjs/common';

import {UserDto} from "./dto/user.dto";

@Injectable()
export class UserService {
    private authUsers = [];

    getAll() {
        return this.authUsers;
    }

    getById(id: string) {
        return this.authUsers.find(u => u.id === id);
    }

    createAuthUser(createAuthUserDTO: UserDto) {
        this.authUsers.push({
            ...createAuthUserDTO,
            id: Date.now().toString()
        })
        return createAuthUserDTO;
    }
}
