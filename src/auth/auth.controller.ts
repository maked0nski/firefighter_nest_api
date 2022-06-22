import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiBasicAuth, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";

import {AuthUserDto} from "./dto";
import {AuthService} from "./auth.service";
import {Tokens} from "./types";
import {AtGuard, RtGuard} from "../core/guards";
import {GetCurrentUserDecorator, GetCurrentUserIdDecorator, Public} from "../core/decorators";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Registration user'})
    @ApiOkResponse({
        status: HttpStatus.CREATED, schema: {
            example: {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjIwMUBnbWFpbC5jb20iLCJpYXQiOjE2NTU4NTEzODQsImV4cCI6MTY1NTg1MjI4NH0.KlgbHUF76K8PyD0QYDh1xgEcsB_HzfgD21X-aTlytYc",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjIwMUBnbWFpbC5jb20iLCJpYXQiOjE2NTU4NTEzODQsImV4cCI6MTY1NjQ1NjE4NH0.bSJUZGZG-Z1uMP_z8uIWGEYQK-oonGlKDmnETI8ISGo"
            }
        }
    })
    @Public()
    @Post('local/register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() authUserDto: AuthUserDto): Promise<Tokens> {
        return this.authService.registration(authUserDto);
    }

    @ApiOperation({summary: 'Login user'})
    @ApiOkResponse({
        status: HttpStatus.OK, schema: {
            example: {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjIwMUBnbWFpbC5jb20iLCJpYXQiOjE2NTU4NTEzODQsImV4cCI6MTY1NTg1MjI4NH0.KlgbHUF76K8PyD0QYDh1xgEcsB_HzfgD21X-aTlytYc",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjIwMUBnbWFpbC5jb20iLCJpYXQiOjE2NTU4NTEzODQsImV4cCI6MTY1NjQ1NjE4NH0.bSJUZGZG-Z1uMP_z8uIWGEYQK-oonGlKDmnETI8ISGo"
            }
        }
    })
    @Public()
    @Post('local/login')
    @HttpCode(HttpStatus.OK)
    login(@Body() authUserDto: AuthUserDto): Promise<Tokens> {
        return this.authService.login(authUserDto);
    }


    @ApiOperation({summary: 'Logout user'})
    @ApiBasicAuth('logout')
    @ApiOkResponse({status: HttpStatus.OK, schema: {example:true}})
    @Post('logout')
    @UseGuards(AtGuard)
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserIdDecorator() userId: number): Promise<boolean> {
        return this.authService.logout(userId);
    }

    @ApiOperation({summary: 'Refresh tokens user'})
    @ApiOkResponse({
        status: HttpStatus.OK, schema: {
            example: {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjIwMUBnbWFpbC5jb20iLCJpYXQiOjE2NTU4NTEzODQsImV4cCI6MTY1NTg1MjI4NH0.KlgbHUF76K8PyD0QYDh1xgEcsB_HzfgD21X-aTlytYc",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjIwMUBnbWFpbC5jb20iLCJpYXQiOjE2NTU4NTEzODQsImV4cCI6MTY1NjQ1NjE4NH0.bSJUZGZG-Z1uMP_z8uIWGEYQK-oonGlKDmnETI8ISGo"
            }
        }
    })
    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserIdDecorator() userId: number,
        @GetCurrentUserDecorator('refreshToken') refreshToken: string
    ): Promise<Tokens> {
        return this.authService.refreshTokens(userId, refreshToken);
    }

}
