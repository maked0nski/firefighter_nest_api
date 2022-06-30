import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';

import {PrismaService} from "../_core/prisma.service";
import {User as UserModel} from '@prisma/client';
import {CreateUserDto, UpdateUserDto} from "./dto";
import {Exception} from "../_exceptions";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";


@Injectable()
export class UserService {

    constructor(private prismaService: PrismaService) {
    }

    async getAll(): Promise<UserModel[]> {
        return await this.prismaService.user.findMany();
    }

    async getAllWithCar(): Promise<UserModel[]> {
        return await this.prismaService.user.findMany({
            include: {
                car: true
            }
        });
    }

    async getAllWithPosition(): Promise<UserModel[]> {
        return await this.prismaService.user.findMany({
            include: {
                position_id: true
            }
        });
    }

    async getAllWithCarAndPosition(): Promise<UserModel[]> {
        return await this.prismaService.user.findMany({
            include: {
                position_id: true,
                car: true
            }
        });
    }

    async getById(id: number): Promise<UserModel> {
        return await this.prismaService.user.findUnique({
            where: {id: id},
            rejectOnNotFound: true
        })
            .catch((error) => {
                console.log("UserService, getById error code: ", error.code)
                throw new NotFoundException(Exception.USER_NOT_FOUND)
            })

    }

    async createAuthUser(data: CreateUserDto): Promise<UserModel> {
        return await this.prismaService.user
            .create({data})
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException('There is a unique constraint violation, a new user cannot be created with this email');
                    }
                    console.log("UserService, createAuthUser error code: ", error.code)
                }
                console.log("UserService, createAuthUser error code: ", error.code)
                throw error;
            });

    }

    async updateUser(userId: number, data: UpdateUserDto): Promise<UserModel> {
        !data.position_id ? data.position_id = null : Number(data.position_id);
        // !data.car ? data.car = null : Number(data.car);
        !data.fuel_card ? data.fuel_card = null : Number(data.fuel_card);

        console.log("position_id-", data.position_id)
        console.log("car-", data.car)
        console.log("fuel_card-", data.fuel_card)

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

    async addPosition(userId: number, positionId: number) {
        return await this.prismaService.user
            .update({
                where: {id: userId},
                data: {
                    position_id: {
                        connect: {
                            id: positionId
                        }
                    }
                }
            })
    }

    async addCar(userId: number, carId: number) {
        return await this.prismaService.user
            .update({
                where: {id: userId},
                data: {
                    car: {
                        connect: {
                            id: carId
                        }
                    }
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