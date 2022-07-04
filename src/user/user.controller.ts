import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    UseGuards
} from '@nestjs/common';
import {ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiTags} from '@nestjs/swagger';

import {AtGuard} from "../core/guards";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto";
import {CustomOkResponse} from "../utils";
import {
    SWAGGER_EXAMPLE_USER,
    SWAGGER_EXAMPLE_USER_BY_ID,
    SWAGGER_EXAMPLE_USERS_LIST,
    SWAGGER_EXAMPLE_USERS_LIST_WITH_CAR,
    SWAGGER_EXAMPLE_USERS_LIST_WITH_CAR_AND_POSITION,
    SWAGGER_EXAMPLE_USERS_LIST_WITH_POSITION,
} from "../utils/example";
import {Exception} from "../exceptions";
import {UserType} from "./type";


@ApiTags('Users')
@Controller('users')
@UseGuards(AtGuard)
export class UserController {

    constructor(private readonly userService: UserService) {
    }

    @ApiOperation({summary: 'Get all users'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_USERS_LIST})
    @HttpCode(HttpStatus.OK)
    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @ApiOperation({summary: 'Get all users with car'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_USERS_LIST_WITH_CAR})
    @HttpCode(HttpStatus.OK)
    @Get('/withCar')
    getAllWithCar(): Promise<UserType[]> {
        return this.userService.getAllWithCar();
    }

    @ApiOperation({summary: 'Get all users with position'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_USERS_LIST_WITH_POSITION})
    @HttpCode(HttpStatus.OK)
    @Get('withPosition')
    getAllWithPosition(): Promise<UserType[]> {
        return this.userService.getAllWithPosition();
    }

    @ApiOperation({summary: 'Get all users with Car and position'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_USERS_LIST_WITH_CAR_AND_POSITION})
    @HttpCode(HttpStatus.OK)
    @Get('withCarAndPosition')
    getAllWithCarAndPosition() {
        return this.userService.getAllWithCarAndPosition();
    }

    @ApiOperation({summary: 'Get one user by id'})
    @CustomOkResponse({status: HttpStatus.OK, exampleData: SWAGGER_EXAMPLE_USER_BY_ID})
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @HttpCode(HttpStatus.OK)
    @Get(':id')
    getById(@Param('id') id: string) {
        return this.userService.getById(Number(id));
    }


    @ApiOperation({summary: 'Update user'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_USER})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @HttpCode(HttpStatus.CREATED)
    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdateDto: UpdateUserDto): Promise<UserType> {
        return this.userService.updateUser(Number(id), userUpdateDto);
    }


    @ApiOperation({summary: 'Add user position'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_USER_BY_ID})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @Patch(':id/addPosition')
    addPosition(@Param('id') id: string, @Body('positionId') positionId: string): Promise<UserType> {
        return this.userService.addPosition(Number(id), Number(positionId))
    }

    @ApiOperation({summary: 'Delete user position'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_USER_BY_ID})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @Patch(':id/deletePosition')
    deletePosition(@Param('id') id: string): Promise<UserType> {
        return this.userService.deletePosition(Number(id))
    }


    @ApiOperation({summary: 'Add car to user'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_USER_BY_ID})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @Patch(':id/addCar')
    addCar(@Param('id') id: string, @Body('carId') carId: string): Promise<UserType> {
        return this.userService.addCar(Number(id), Number(carId))
    }

    @ApiOperation({summary: 'Remove car from user'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_USER_BY_ID})
    @HttpCode(HttpStatus.OK)
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @Patch(':id/deleteCar')
    deleteCar(@Param('id') id: string): Promise<UserType> {
        return this.userService.deleteCar(Number(id))
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.userService.deleteUser(Number(id))
    }


}
