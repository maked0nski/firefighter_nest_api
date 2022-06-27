import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';

import {CreateUserDto} from "./dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto";
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CustomOkResponse} from "../utils/swagger.helper";
import {
    SWAGGER_EXAMPLE_USER_BY_ID,
    SWAGGER_EXAMPLE_USERS_LIST,
} from "../utils/example";


@ApiTags('Users')
@Controller('users')
export class UserController {

    constructor(private readonly authUserService: UserService) {
    }

    @ApiOperation({summary: 'Get all users'})
    @CustomOkResponse({status:HttpStatus.OK, exampleData:SWAGGER_EXAMPLE_USERS_LIST})
    @HttpCode(HttpStatus.OK)
    @Get()
    getAll() {
        return this.authUserService.getAll();
    }

    @ApiOperation({summary: 'Get one user by id'})
    @CustomOkResponse({status:HttpStatus.OK, exampleData:SWAGGER_EXAMPLE_USER_BY_ID})
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    // getById(@Param() params): string {  //Якщо беремо всі параметри і пошук
    getById(@Param('id') id: string) {  //Якщо беремо тільки певний параметр
        return this.authUserService.getById(id);
    }

    // @HttpCode(HttpStatus.OK)
    // @Get('/:userEmail')
    // // getById(@Param() params): string {  //Якщо беремо всі параметри і пошук
    // getByEmail(@Param('userEmail') userEmail: string) {  //Якщо беремо тільки певний параметр
    //     console.log('getByEmail')
    //     return this.authUserService.getById(userEmail);
    // }

    @ApiResponse({status: 403, description: 'Forbidden.'})
    @CustomOkResponse({status:HttpStatus.CREATED, exampleData:SWAGGER_EXAMPLE_USER_BY_ID})
    @HttpCode(HttpStatus.CREATED)
    @Post()
    save(@Body() userDto: CreateUserDto) {
        return this.authUserService.createAuthUser(userDto);
    }

    @CustomOkResponse({status:HttpStatus.CREATED, exampleData:SWAGGER_EXAMPLE_USER_BY_ID})
    @HttpCode(HttpStatus.CREATED)
    @Patch('/:id')
    update(@Param('id') id: string, @Body() userUpdateDto: UpdateUserDto) {
        return this.authUserService.updateUser(userUpdateDto, id);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('id')
    delete(@Param('id') id: string) {
        return id;
    }



}
