import {Body, Controller, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";

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

    @Public()
    @Post('local/register')
    @HttpCode(HttpStatus.CREATED)
    register(@Body() authUserDto: AuthUserDto): Promise<Tokens> {
        return this.authService.registration(authUserDto);
    }

    @Public()
    @Post('local/login')
    @HttpCode(HttpStatus.OK)
    login(@Body() authUserDto: AuthUserDto): Promise<Tokens> {
        return this.authService.login(authUserDto);
    }

    @Post('logout')
    @UseGuards(AtGuard)
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserIdDecorator() userId: number): Promise<boolean> {
        return this.authService.logout(userId);
    }

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
