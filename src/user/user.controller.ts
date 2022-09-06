import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch, Res, UploadedFile,
    UseGuards, UseInterceptors
} from '@nestjs/common';
import {ApiForbiddenResponse, ApiNotFoundResponse, ApiOperation, ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";

import {AtGuard} from "../core/guards";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto";
import {CustomOkResponse, editFileName, imageFileFilter} from "../utils";
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
import {Public} from "../core/decorators";
// import ImageKit from "imagekit";


@ApiTags('Users')
@Controller('users')
@UseGuards(AtGuard)
export class UserController {

    ImageKit = require("imagekit");
    imagekit= new this.ImageKit({
        publicKey: "public_nfGb6hfIIfP1QD7wvUQZYNIDQOE=",
        privateKey: "private_NGWLTaOgidwvWDM0CICw0g72WxA=",
        urlEndpoint: "https://ik.imagekit.io/maked0nski"
    })


    constructor(
        private readonly userService: UserService,
    ) {}


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


    // @Get(':id/image')
    // watchFile(@Param('id') id: string, @Res() res) {
    //     console.log(id)
    //     let image: string
    //     this.userService.getById(Number(id)).then(value => {
    //         console.log(image)
    //         image = value.image
    //         console.log(image)
    //     });
    //     console.log(image)
    //     return res.sendFile(image, {root: './files/image/'});
    // }


    @ApiOperation({summary: 'Update user'})
    @CustomOkResponse({status: HttpStatus.CREATED, exampleData: SWAGGER_EXAMPLE_USER})
    @ApiForbiddenResponse({description: Exception.FORBIDDEN})
    @ApiNotFoundResponse({description: Exception.USER_NOT_FOUND})
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './files/image',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter
        })
    )
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() userUpdateDto: UpdateUserDto,
        @UploadedFile() image: Express.Multer.File,
    ): Promise<UserType> {
        console.log('update')
        try {
            if (image) {
                // console.log(image)
                // const response = {
                //     originalname: image.originalname,
                //     filename: image.filename,
                // };
                // userUpdateDto.image = `./files/image/${image.filename}`;
                userUpdateDto.image = `${image.filename}`;
                console.log(userUpdateDto)
                // this.imagekit.upload({
                //     file: image.buffer,
                //     fileName: image.filename,
                // })
            }
            return this.userService.updateUser(Number(id), userUpdateDto);
        } catch (e) {
            console.log(e)
        }

    }



    @Public()
    @Get('/avatar/:image')
    getAvatar(@Param('image') image, @Res() res) {
        // console.log(image)
        return res.sendFile(image, {root: './files/image'});
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
