import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';

import {CreateUserDto} from "./dto/create.user.dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update.user.dto";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';


@ApiTags('Users')
@Controller('users')
export class UserController {

    constructor(private readonly authUserService: UserService) {
    }

    @ApiOperation({summary: 'Get one user by id'})
    @ApiOkResponse({
        status: HttpStatus.OK, schema: {
            example: [
                {
                    id: 1,
                    createdAt: "2022-06-20T17:19:41.302Z",
                    updatedAt: "2022-06-20T17:19:41.303Z",
                    surename: "Ivancovskiy",
                    name: "Ivan",
                    fathersname: "Ivanjvich",
                    phone: "050-93-99-554",
                    email: "Ivan1@gmail.com",
                    birthday: "25.02.1990",
                    password: "55484896",
                    image: "https://www.gravatar.com/avatar/ivan.jpg",
                    role: "USER",
                    refresh_token: null,
                    access_token: null,
                    positionId: null
                },
                {
                    id: 2,
                    createdAt: "2022-06-20T17:19:42.302Z",
                    updatedAt: "2022-06-20T17:19:42.303Z",
                    surename: "Maksimov",
                    name: "Oleg",
                    fathersname: "Viktorovich",
                    phone: "050-93-99-321",
                    email: "maksimov@gmail.com",
                    birthday: "31.12.1982",
                    password: "55484896",
                    image: "https://www.gravatar.com/avatar/ivan.jpg",
                    role: "ADMIN",
                    refresh_token: null,
                    access_token: null,
                    positionId: null
                }
            ]
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getAll() {
        return this.authUserService.getAll();
    }

    @ApiOperation({summary: 'Get one user by id'})
    @ApiOkResponse({
        status: HttpStatus.OK, schema: {
            example: {
                id: 7,
                createdAt: "2022-06-20T17:19:41.302Z",
                updatedAt: "2022-06-20T17:19:41.303Z",
                surename: "Ivancovskiy",
                name: "Ivan",
                fathersname: "Ivanjvich",
                phone: "050-93-99-554",
                email: "Ivan1@gmail.com",
                birthday: null,
                password: "55484896",
                image: "https://www.gravatar.com/avatar/ivan.jpg",
                role: "USER",
                refresh_token: null,
                access_token: null,
                positionId: null
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    // getById(@Param() params): string {  //Якщо беремо всі параметри і пошук
    getById(@Param('id') id: string) {  //Якщо беремо тільки певний параметр
        return this.authUserService.getById(id);
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:userEmail')
    // getById(@Param() params): string {  //Якщо беремо всі параметри і пошук
    getByEmail(@Param('userEmail') userEmail: string) {  //Якщо беремо тільки певний параметр
        return this.authUserService.getById(userEmail);
    }

    @ApiResponse({status: 403, description: 'Forbidden.'})
    @ApiOkResponse({
        status: HttpStatus.CREATED, schema: {
            example: {
                id: 7,
                createdAt: "2022-06-20T17:19:41.302Z",
                updatedAt: "2022-06-20T17:19:41.303Z",
                surename: "Ivancovskiy",
                name: "Ivan",
                fathersname: "Ivanjvich",
                phone: "050-93-99-554",
                email: "Ivan1@gmail.com",
                birthday: null,
                password: "55484896",
                image: "https://www.gravatar.com/avatar/ivan.jpg",
                role: "USER",
                refresh_token: null,
                access_token: null,
                positionId: null
            }
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    save(@Body() userDto: CreateUserDto) {
        return this.authUserService.createAuthUser(userDto);
    }

    @ApiOkResponse({
        status: HttpStatus.CREATED, schema: {
            example: {
                id: 7,
                createdAt: "2022-06-20T17:19:41.302Z",
                updatedAt: "2022-06-20T17:19:41.303Z",
                surename: "Ivancovskiy",
                name: "Ivan",
                fathersname: "Ivanjvich",
                phone: "050-93-99-554",
                email: "Ivan1@gmail.com",
                birthday: null,
                password: "55484896",
                image: "https://www.gravatar.com/avatar/ivan.jpg",
                role: "USER",
                refresh_token: null,
                access_token: null,
                positionId: null
            }
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Put('/:id')
    update(@Param('id') id: string, @Body() userUpdateDto: UpdateUserDto) {
        return this.authUserService.updateUser(userUpdateDto, id);
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('/id')
    delete(@Param('id') id: string) {
        return id;
    }
}
