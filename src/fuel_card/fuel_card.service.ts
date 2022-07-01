import {ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {Prisma} from "@prisma/client";

import {Fuel_card as Fuel_cardModel} from '@prisma/client';
import {UpdateFuelCardDto} from "./dto";
import {Exception} from "../exceptions";

@Injectable()
export class FuelCardService {
    constructor(private prismaService: PrismaService) {
    }


    async getAllFuelCards(): Promise<Fuel_cardModel[]> {
        try {
            return await this.prismaService.fuel_card.findMany()
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

    }


    async getFuelCardById(id: number): Promise<any> {
        try {
            return await this.prismaService.fuel_card
                .findUnique({
                    where: {id},
                    rejectOnNotFound: true
                })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(Exception.CARD_NOT_FOUND)
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    async createFuelCard(data: Prisma.Fuel_cardCreateInput): Promise<Fuel_cardModel> {
        try {
            return await this.prismaService.fuel_card
                .create({data})
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new NotFoundException(Exception.FORBIDDEN)
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    async deleteFuelCardById(id: number) {
        try {
            return await this.prismaService.fuel_card.delete({
                where: {id}
            })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
                throw new NotFoundException(Exception.CARD_NOT_FOUND)
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }


    async updateFuelCardById(id: number, data: UpdateFuelCardDto) {
        try {
            return await this.prismaService.fuel_card
                .update({
                    where: {id},
                    data
                })
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(Exception.FORBIDDEN);
                }
                if (error.code === 'P2025') {
                    throw new NotFoundException(Exception.CARD_NOT_FOUND)
                }
            }
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
