import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';

import {CreateUserDto} from "./dto/create.user.dto";
import {UserService} from "./user.service";
import {User} from "@prisma/client";

@Controller('user-login')
export class UserController {

    constructor(private readonly authUserService: UserService) {
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getAll() {
        return this.authUserService.getAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    // getById(@Param() params): string {  //Якщо беремо всі параметри і пошук
    getById(@Param('id') id: string) {  //Якщо беремо тільки певний параметр
        return this.authUserService.getById(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    save(@Body() userDto: CreateUserDto) {
        return this.authUserService.createAuthUser(userDto);
    }

    // @HttpCode(HttpStatus.CREATED)
    // @Put('/:id')
    // update(@Param('id') id: string, @Body() userDto: CreateUserDto) {
    //     return this.authUserService.updateUser(userDto, id);
    // }

    @HttpCode(HttpStatus.NOT_FOUND)
    @Delete('/id')
    delete(@Param('id') id: string) {
        return id;
    }
}
