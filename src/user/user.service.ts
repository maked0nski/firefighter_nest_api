import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';

import {PrismaService} from "../core/prisma.service";
import {UpdateUserDto} from "./dto";
import {Exception} from "../exceptions";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {UserType} from "./type";


@Injectable()
export class UserService {

    constructor(private prismaService: PrismaService) {
    }

    async getAll() {
        return await this.prismaService.user.findMany({
            select: {
                id: true,
                surename: true,
                name: true,
                fathersname: true,
                phone: true,
                email: true,
                birthday: true,
                image: true,
                role: true,
            }
        });
    }

    async getAllWithCar(): Promise<UserType[]> {
        return this.prismaService.user.findMany({
            select: {
                id: true,
                surename: true,
                name: true,
                fathersname: true,
                phone: true,
                email: true,
                birthday: true,
                image: true,
                role: true,
                car: true,
            }
        });
    }

    async getAllWithPosition(): Promise<UserType[]> {
        return await this.prismaService.user.findMany({
            select: {
                id: true,
                surename: true,
                name: true,
                fathersname: true,
                phone: true,
                email: true,
                birthday: true,
                image: true,
                role: true,
                positionId: true,
            }
        });
    }

    async getAllWithCarAndPosition(): Promise<UserType[]> {
        return await this.prismaService.user.findMany({
            select: {
                id: true,
                surename: true,
                name: true,
                fathersname: true,
                phone: true,
                email: true,
                birthday: true,
                image: true,
                role: true,
                positionId: true,
                car: true,
            }
        });
    }

    async getById(id: number): Promise<UserType> {
        return await this.prismaService.user.findUnique({
            where: {id: id},
            select: {
                id: true,
                surename: true,
                name: true,
                fathersname: true,
                phone: true,
                email: true,
                birthday: true,
                image: true,
                role: true,
                car: true,
                positionId: true,
                fuel_card: true
            },
            rejectOnNotFound: true
        })
            .catch((error) => {
                throw new HttpException(error.message, HttpStatus.NOT_FOUND);
            })

    }

    async updateUser(userId: number, data: UpdateUserDto): Promise<UserType> {

        try {
            return await this.prismaService.user
                .update({
                    where: {id: userId},
                    data: {
                        surename: data.surename,
                        name: data.name,
                        fathersname: data.fathersname,
                        phone: data.phone,
                        birthday: data.birthday,
                        image: data.image,
                        role: data.role,
                    },
                    select: {
                        id: true,
                        surename: true,
                        name: true,
                        fathersname: true,
                        phone: true,
                        email: true,
                        birthday: true,
                        image: true,
                        role: true,
                        car: true,
                        positionId: true,
                        fuel_card: true
                    }
                })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(Exception.FORBIDDEN);
                }
                if (error.code === 'P2025') {
                    throw new NotFoundException(Exception.USER_NOT_FOUND)
                }
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async addPosition(userId: number, positionId: number): Promise<UserType> {
        try {
            return await this.prismaService.user
                .update({
                    where: {id: userId},
                    data: {
                        positionId: positionId
                    },
                    select: {
                        id: true,
                        surename: true,
                        name: true,
                        fathersname: true,
                        phone: true,
                        email: true,
                        birthday: true,
                        image: true,
                        role: true,
                        car: true,
                        positionId: true,
                        fuel_card: true
                    }
                })
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }

    }

    async addCar(userId: number, carId: number): Promise<UserType> {
        try {
            return await this.prismaService.user
                .update({
                    where: {id: userId},
                    data: {
                        car: {
                            connect: {
                                id: carId
                            }
                        }
                    },
                    select: {
                        id: true,
                        surename: true,
                        name: true,
                        fathersname: true,
                        phone: true,
                        email: true,
                        birthday: true,
                        image: true,
                        role: true,
                        car: true,
                        positionId: true,
                        fuel_card: true
                    }
                })
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async deleteUser(id: number): Promise<void> {
        try {
            await this.prismaService.user.delete({
                where: {id}
            });
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }

    }
}

// demoUser
// P@aSsw0rds