import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
        UseGuards
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';

import {User as UserModel} from '@prisma/client';
import {AtGuard} from "../_core/guards";
import {CreateUserDto} from "./dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto";
import {CustomOkResponse} from "../_utils";
import {
    SWAGGER_EXAMPLE_USER_BY_ID,
    SWAGGER_EXAMPLE_USERS_LIST,
} from "../_utils/example";
import {Exception} from "../_exceptions";


@ApiTags('Users')
@Controller('users')
@UseGuards(AtGuard)
export class UserController {

    constructor(private readonly authUserService: UserService) {
    }

    @ApiOperation({summary: 'Get all users'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_USERS_LIST})
    @HttpCode(HttpStatus.OK)
    @Get()
    getAll(): Promise<UserModel[]> {
        return this.authUserService.getAll();
    }

    @ApiOperation({summary: 'Get one user by id'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_USER_BY_ID})
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: Exception.USER_NOT_FOUND })
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getById(@Param('id') id: string): Promise<UserModel> {  //Якщо беремо тільки певний параметр
        return this.authUserService.getById(Number(id));
    }


    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: HttpStatus.FORBIDDEN, description: Exception.FORBIDDEN})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_USER_BY_ID})
    @HttpCode(HttpStatus.CREATED)
    @Post()
    save(@Body() userDto: CreateUserDto): Promise<UserModel> {
        return this.authUserService.createAuthUser(userDto);
    }

    @ApiOperation({summary: 'Update user'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_USER_BY_ID})
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: Exception.FORBIDDEN })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: Exception.USER_NOT_FOUND })
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdateDto: UpdateUserDto): Promise<UserModel> {
        return this.authUserService.updateUser(Number(id), userUpdateDto);
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: Exception.USER_NOT_FOUND })
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.authUserService.deleteUser(Number(id))
    }

}
