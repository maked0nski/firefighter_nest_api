import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';

import {CreateUserLoginDTO} from "./dto/create-user-login.DTO";
import {UserLoginService} from "./user-login.service";

@Controller('user-login')
export class UserLoginController {

    constructor(private readonly authUserService: UserLoginService) {
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getAll() {
        return this.authUserService.getAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    // getById(@Param() params): string {  //Якщо беремо всі параметри і пошук
    getById(@Param('id') id: string): string {  //Якщо беремо тільки певний параметр
        return this.authUserService.getById(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    save(@Body() createAuthUserDTO: CreateUserLoginDTO) {
        return this.authUserService.createAuthUser(createAuthUserDTO);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/:id')
    update(@Param('id') id: string, @Body() createAuthUserDTO: CreateUserLoginDTO) {
        return createAuthUserDTO;
    }

    @HttpCode(HttpStatus.NOT_FOUND)
    @Delete('/id')
    delete(@Param('id') id: string) {
        return id;
    }
}
