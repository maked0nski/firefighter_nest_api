import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';

import {UserDto} from "./dto/user.dto";
import {UserService} from "./user.service";

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
    getById(@Param('id') id: string): string {  //Якщо беремо тільки певний параметр
        return this.authUserService.getById(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    save(@Body() createAuthUserDTO: UserDto) {
        return this.authUserService.createAuthUser(createAuthUserDTO);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('/:id')
    update(@Param('id') id: string, @Body() createAuthUserDTO: UserDto) {
        return createAuthUserDTO;
    }

    @HttpCode(HttpStatus.NOT_FOUND)
    @Delete('/id')
    delete(@Param('id') id: string) {
        return id;
    }
}
