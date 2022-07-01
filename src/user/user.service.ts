import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';

import {PrismaService} from "../core/prisma.service";
import {UpdateUserDto} from "./dto";
import {Exception} from "../exceptions";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {UserType} from "./type/userType";


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
                position_id: true,
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
                position_id: true,
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
                position_id: true,
                fuel_card: true
            },
            rejectOnNotFound: true
        })
            .catch((error) => {
                console.log("UserService, getById error code: ", error.code)
                throw new NotFoundException(Exception.USER_NOT_FOUND)
            })

    }

    // async createAuthUser(data: CreateUserDto): Promise<UserModel> {
    //     return await this.prismaService.user
    //         .create({
    //             data: {
    //                 email:data.email,
    //                 password: data.password
    //             },
    //             select: {
    //                 id: true,
    //                 surename: true,
    //                 name: true,
    //                 fathersname: true,
    //                 phone: true,
    //                 email: true,
    //                 birthday: true,
    //                 image: true,
    //                 role: true,
    //                 car: true,
    //                 position_id: true,
    //                 fuel_card: true
    //             }
    //         })
    //         .catch((error) => {
    //             if (error instanceof PrismaClientKnownRequestError) {
    //                 if (error.code === 'P2002') {
    //                     throw new ForbiddenException('There is a unique constraint violation, a new user cannot be created with this email');
    //                 }
    //                 console.log("UserService, createAuthUser error code: ", error.code)
    //             }
    //             console.log("UserService, createAuthUser error code: ", error.code)
    //             throw error;
    //         });
    //
    // }

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
                        position_id: true,
                        fuel_card: true
                    }
                })
        } catch (error) {            // TODO  НЕ вдається зробити кеч
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials incorrect');
                }
                if (error.code === 'P2025') {
                    throw new NotFoundException(Exception.USER_NOT_FOUND)
                }
            }
            console.log("position service update error code: ", error.code)
            throw error;
        }
    }

    async addPosition(userId: number, positionId: number): Promise<UserType> {
        return await this.prismaService.user
            .update({
                where: {id: userId},
                data: {
                    position_id: {
                        connect: {
                            id: positionId
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
                    position_id: true,
                    fuel_card: true
                }
            })
    }

    async addCar(userId: number, carId: number): Promise<UserType> {
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
                    position_id: true,
                    fuel_card: true
                }
            })
    }

    async deleteUser(id: number): Promise<void> {
        console.log('service')
        await this.prismaService.user.delete({
            where: {id}
        });
    }
}

// demoUser
// P@aSsw0rds