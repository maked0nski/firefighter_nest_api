import {Module} from '@nestjs/common';

import {UserService} from './user.service';
import {UserController} from "./user.controller";
import {PrismaService} from "../_core/prisma.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, PrismaService],
    exports: [PrismaService]
})
export class UserModule {
}
