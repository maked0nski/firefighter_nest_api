import {Module} from '@nestjs/common';

import {UserLoginService} from './user-login.service';
import {UserLoginController} from "./user-login.controller";

@Module({
    imports:[],
    controllers: [UserLoginController],
    providers: [UserLoginService]
})
export class UserLoginModule {
}
