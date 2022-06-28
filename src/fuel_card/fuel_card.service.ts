import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import {Prisma} from "@prisma/client";

import {UpdateFuelCardDto} from "./dto";
import {Fuel_card as Fuel_cardModel} from '@prisma/client';
import {Exception} from "../exceptions";

@Injectable()
export class FuelCardService {
    constructor(private prismaService: PrismaService) {
    }


    async getAllFuelCards(): Promise<Fuel_cardModel[]> {
        return await this.prismaService.fuel_card.findMany()
    }


    async getFuelCardById(id: number): Promise<any> {
        return await this.prismaService.fuel_card.findUnique({
            where: {id},
            rejectOnNotFound: true
        })
            .catch((error) => {
                console.log(error.code)
                throw new NotFoundException(Exception.CARD_NOT_FOUND)
            })
    }


    async createFuelCard(data: Prisma.Fuel_cardCreateInput): Promise<Fuel_cardModel> {

        return await this.prismaService.fuel_card
            .create({data})
            .catch((error) => {
                if (error instanceof PrismaClientKnownRequestError) {
                    if (error.code === 'P2002') {
                        throw new ForbiddenException('Credentials incorrect');
                    }
                }
                throw error;
            });

    }


    async deleteFuelCardById(id: number) {
        return await this.prismaService.fuel_card.delete({
            where: {id}
        })
            .catch((error) => {
                console.log(error.code)
                throw new NotFoundException(Exception.CARD_NOT_FOUND)
            })
    }


    async updateFuelCardById(id: number, data: UpdateFuelCardDto) {
        return await this.prismaService.fuel_card
            .update({
                where: {id},
                data
                // data: {
                //     number: updateFuelCardDto.number,
                //     pin: updateFuelCardDto.pin,
                //     active: updateFuelCardDto.active,
                //     station_brend: updateFuelCardDto.station_brend,
                //     userId: updateFuelCardDto.userId
                // }
            })
            .catch((error) => {
                console.log(error.code)
                throw new NotFoundException(Exception.CARD_NOT_FOUND)
            })
    }
}
